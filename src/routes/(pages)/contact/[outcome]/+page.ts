import { error } from '@sveltejs/kit';
import { contact } from '$lib/config';

const { outcomes } = contact;

// nuffin' links 'ere, so they're named up front or they'd never get built
export const entries = () => Object.keys(outcomes).map((outcome) => ({ outcome }));

export const load = ({ params }) => outcomes[params.outcome as keyof typeof outcomes] ?? error(404);
