<script lang="ts">
	import { contact } from '$lib/config';
	import Send from '~icons/tabler/send';

	const { action, limits, trap, outcomes } = contact;
	type Outcome = keyof typeof outcomes;

	let sending = $state(false);
	let outcome = $state<Outcome>();

	// anyfin' that isn't a straight answer from the worker counts as failed
	async function post(form: HTMLFormElement): Promise<Outcome> {
		const response = await fetch(action, {
			method: 'POST',
			body: new FormData(form),
			headers: { accept: 'application/json' },
			signal: AbortSignal.timeout(15_000)
		});
		const { outcome } = await response.json();
		return outcome in outcomes ? outcome : 'failed';
	}

	// wiv JS about, the answer turns up by the button rather than on a page of its own
	async function send(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
		event.preventDefault();
		if (sending) return;

		const form = event.currentTarget;
		sending = true;
		outcome = undefined;
		outcome = await post(form).catch(() => 'failed' as const);
		sending = false;
		if (outcome === 'sent') form.reset();
	}
</script>

<form method="post" {action} onsubmit={send}>
	<label>
		Name
		<input name="name" autocomplete="name" maxlength={limits.name} required />
	</label>

	<label>
		Email
		<input name="email" type="email" autocomplete="email" maxlength={limits.email} required />
	</label>

	<label class="message">
		Message
		<textarea name="message" maxlength={limits.message} required></textarea>
	</label>

	<input name={trap} autocomplete="off" hidden />

	<div class="send">
		<button class="button" aria-disabled={sending}>
			<Send aria-hidden="true" />{sending ? 'Sending...' : 'Send message'}
		</button>
		<p role="status" class:oops={outcome !== 'sent'}>
			{#if outcome}<strong>{outcomes[outcome].title}</strong> {outcomes[outcome].description}{/if}
		</p>
	</div>
</form>

<style>
	/* two across at most, so name an' email pair up wivout leavin' a gap */
	form {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, max(var(--field-width), 40%)), 1fr));
		gap: var(--form-gap) var(--list-gap);
	}

	.message,
	.send {
		grid-column: 1 / -1;
	}

	.send {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--gap) var(--list-gap);
	}

	label {
		display: grid;
		gap: var(--gap);
		font-size: var(--small-size);
		font-weight: var(--button-weight);
	}

	input,
	textarea {
		padding: var(--field-padding);
		border: 0;
		border-bottom: var(--field-line);
		border-radius: var(--radius) var(--radius) 0 0;
		background: var(--field-bg);
		color: inherit;
		caret-color: var(--primary);
		font: var(--font-size) / var(--line-height) var(--font);
		transition: border-color var(--hover-transition);
	}

	input:hover,
	textarea:hover {
		border-color: var(--text);
	}

	/* only goes red once they've 'ad a go, not the second the page loads */
	input:user-invalid,
	textarea:user-invalid {
		border-color: var(--danger);
	}

	/* the yellow line's the focus ring, so the usual one can sit this out */
	input:focus,
	textarea:focus {
		border-color: var(--primary);
		outline: none;
	}

	/* grows wiv what they type, where the browser knows how */
	textarea {
		min-height: var(--message-height);
		resize: vertical;
		field-sizing: content;
	}

	button {
		display: flex;
		align-items: center;
		gap: var(--gap);
		min-height: var(--action-height);
		padding-inline: var(--list-gap);
		border: 0;
		background: var(--primary);
		color: var(--primary-text);
		font-family: inherit;
		cursor: pointer;
	}

	/* wiv its dark text the ring'd go proper invisible against the card */
	button:focus-visible {
		outline-color: var(--primary);
	}

	button[aria-disabled='true'] {
		cursor: progress;
	}

	p {
		flex: 1 1 var(--field-width);
		margin: 0;
		color: var(--muted);
		font-size: var(--small-size);
	}

	/* nowt to say yet, so it tucks in beside the button wivout leavin' a gap */
	p:empty {
		flex-basis: 0;
	}

	strong {
		color: var(--primary);
	}

	.oops strong {
		color: var(--danger);
	}

	@media (prefers-reduced-motion: no-preference) {
		button :global(svg) {
			transition: translate var(--hover-transition);
		}

		/* the little plane gets itchy feet when you go near it */
		button:hover :global(svg) {
			translate: var(--send-nudge);
		}

		button[aria-disabled='true'] :global(svg) {
			animation: takeoff var(--send-takeoff) infinite alternate;
		}
	}

	@keyframes takeoff {
		to {
			translate: var(--send-nudge);
		}
	}
</style>
