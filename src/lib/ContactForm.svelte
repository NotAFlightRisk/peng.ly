<script lang="ts">
	import { contact } from '$lib/config';
	import Send from '~icons/tabler/send';

	const { action, limits, trap } = contact;
</script>

<form method="post" {action}>
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

	<button class="button"><Send aria-hidden="true" />Send message</button>
</form>

<style>
	/* two across at most, so name an' email pair up wivout leavin' a gap */
	form {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, max(var(--field-width), 40%)), 1fr));
		gap: var(--form-gap) var(--list-gap);
	}

	.message,
	button {
		grid-column: 1 / -1;
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
		justify-self: start;
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

	@media (prefers-reduced-motion: no-preference) {
		button :global(svg) {
			transition: translate var(--hover-transition);
		}

		/* the little plane gets itchy feet when you go near it */
		button:hover :global(svg) {
			translate: var(--send-nudge);
		}
	}
</style>
