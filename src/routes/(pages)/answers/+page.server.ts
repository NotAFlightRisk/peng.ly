import { unlisted } from '#lib/config.js';
import { answered } from '#lib/answers.server.js';
import { byRepo } from '#lib/github.server.js';

export const load = async ({ fetch }) => ({ ...unlisted.answers, answers: byRepo(await answered(fetch)) });
