import { pages } from '#lib/config.js';
import PaperPlanes from '#lib/visuals/PaperPlanes.svelte';

export const csr = true;

export const load = () => ({ ...pages.contact, wide: true, footer: PaperPlanes });
