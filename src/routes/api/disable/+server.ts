import { Redis } from '@upstash/redis';
import type { RequestHandler } from '@sveltejs/kit';

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN!;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_UR!;

const redis = new Redis({
	url: UPSTASH_REDIS_REST_URL,
	token: UPSTASH_REDIS_REST_TOKEN
});

export const POST: RequestHandler = async (req) => {
	try {
		await redis.set('bot_enabled', 'false');

		return new Response('Bot disabled.');
	} catch (error) {
		console.error('Error disabling the bot:', error);
		return new Response('Error disabling the bot.', { status: 500 });
	}
};
