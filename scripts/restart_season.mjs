import { createClient } from 'redis';

// Create a Redis client and configure the connection
const client = createClient({ url: process.env.REDIS_URL });

// Handle Redis client events
client.on('error', (err) => {
	console.error('Redis Client Error', err);
});

client.on('ready', () => {
	console.log('Redis client connected');
});

client.on('end', () => {
	console.log('Redis client disconnected');
});

// Connect to the Redis server
client.connect();

// Function to handle errors in the try/catch block
/**
 * Handles errors and quits the Redis client.
 * @param {Error} error - The error to handle.
 * @returns {Promise<void>}
 */
async function handleError(error) {
	console.error('Error:', error);
	client.quit();
	process.exit(1);
}

async function deleteDuels() {
	const keys = await client.keys('user:*:duels');
	for (const key of keys) {
		console.log("🚀 ~ Delete player duels:", key)
		await client.del(key);
	}
	console.log('The duels have been successfully deleted.');
	return
}

async function deleteLeaderboard() {
	const keys = await client.keys('leaderboard:*');
	for (const key of keys) {
		console.log("🚀 ~ Delete leaderboard:", key)
		await client.del(key);
	}
	console.log('The leaderboards have been successfully deleted.');
	return;
}

async function renameRankings() {
	const season = await client.get('season');
	const keys = await client.keys('ranking*');

	const filteredKeys = keys.filter(key => key.includes('season') === false)

	for (const key of filteredKeys) {
		console.log("🚀 ~ Rename ranking:", key)
		const newKey = key.replace('ranking', `ranking:season:${season}`);
		await client.rename(key, newKey);
	}
	console.log('The rankings have been successfully renamed.');
	return;
}

// Execute the season restart process
(async () => {
	try {
		//1. delete players duels of current season --> generated dynamically from every duel
		await deleteDuels();
		//2. delete leardeboard keys of current season --> generated dynamically from every duel
		await deleteLeaderboard();
		//3. rename rankings keys of current season  --> generated dynamically from qstash
		await renameRankings();
		//4. Increment season
		await client.incr('season');
		console.log('The season has been successfully restarted.');
	} catch (e) {
		await handleError(e);
	} finally {
		client.quit();
	}
})();