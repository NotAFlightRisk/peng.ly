import { contact, pages, site } from '../src/lib/config';

type Outcome = keyof typeof contact.outcomes;
type Env = {
	EMAIL: { send(email: object): Promise<unknown> };
	LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> };
	TO: string;
};

// browsers send new lines as two characters, so they're squashed back to one before countin'
function field(form: FormData, key: keyof typeof contact.limits) {
	const value = String(form.get(key) ?? '').replaceAll('\r\n', '\n').trim();
	return value.length <= contact.limits[key] ? value : '';
}

// name an' email end up in the headers, where a sneaky line break could forge new ones
const oneLine = (value: string) => !value.includes('\n') && !value.includes('\r');

async function deliver(request: Request, env: Env): Promise<Outcome> {
	// a browser always says which site it posted from, a dodgy script often don't
	if (request.headers.get('origin') !== new URL(request.url).origin) return 'failed';
	// a few a minute from any one address, which no human's gonna bump into
	const { success } = await env.LIMITER.limit({ key: request.headers.get('cf-connecting-ip') ?? '' });
	if (!success) return 'limited';

	const form = await request.formData();
	// a bot's filled in the box nobody can see, so it's told it worked an' gets binned
	if (form.get(contact.trap)) return 'sent';

	const [name, email, message] = (['name', 'email', 'message'] as const).map((key) => field(form, key));
	if (!name || !email || !message || !oneLine(name + email)) return 'failed';

	await env.EMAIL.send({
		to: env.TO,
		from: { email: contact.from, name: site.name },
		replyTo: { email, name },
		subject: `Message from ${name}`,
		text: `${message}\n\n${name} <${email}>`
	});
	return 'sent';
}

export default {
	async fetch(request: Request, env: Env) {
		if (request.method !== 'POST') return new Response(null, { status: 405, headers: { allow: 'POST' } });

		const outcome = await deliver(request, env).catch((error) => {
			console.error(error);
			return 'failed' as const;
		});
		// the form's script just wants the answer, wivout JS they're off to a proper page
		if (request.headers.get('accept') === 'application/json') return Response.json({ outcome });
		return new Response(null, { status: 303, headers: { location: `${pages.contact.href}/${outcome}` } });
	}
};
