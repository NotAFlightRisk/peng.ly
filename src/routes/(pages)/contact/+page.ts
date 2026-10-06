import { pages } from '$lib/config';

export const csr = true;

export const load = () => ({ ...pages.contact, wide: true });
