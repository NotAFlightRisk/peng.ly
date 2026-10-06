<script lang="ts">
	import { contact } from '$lib/config';
	import Panel from '$lib/Panel.svelte';
	import ContactForm from '$lib/ContactForm.svelte';
	import Elsewhere from '$lib/Elsewhere.svelte';
</script>

<div>
	<Panel title={contact.title}><ContactForm /></Panel>
	<Panel title={contact.elsewhere.title}><Elsewhere /></Panel>
</div>

<style>
	div {
		display: grid;
		align-items: start;
		gap: var(--gutter);
	}

	/* side by side once there's room, wiv the form gettin' the lion's share */
	@media (width >= 55rem) {
		div {
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		}
	}
</style>
