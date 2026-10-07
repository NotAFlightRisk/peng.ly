import Departures from '$lib/visuals/Departures.svelte';

export const csr = true;
export const load = ({ data }) => ({ ...data, footer: Departures });
