import { unlisted } from '$lib/config';
import { answered } from '$lib/answers.server';
import { byRepo } from '$lib/github.server';

export const load = async ({ fetch }) => ({ ...unlisted.answers, answers: byRepo(await answered(fetch)) });
