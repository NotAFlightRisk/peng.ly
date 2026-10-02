import { errors } from '$lib/config';

// builds to 404.html, which is the file the host serves for any address it don't know
export const load = () => errors.lost;

// his eyes want JS to follow you about, same as on the front page
export const csr = true;
