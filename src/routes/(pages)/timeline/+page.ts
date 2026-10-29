import Filters from '$lib/Filters.svelte';

export const load = ({ data }) => ({ ...data, beside: Filters });
