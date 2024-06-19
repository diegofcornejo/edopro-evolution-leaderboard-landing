import { report } from 'process';
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

/**
 * Counts the duels for each user and the total number of duels, including the count of duels per banlist.
 * @param {string} pattern - The pattern to match keys in Redis.
 * @returns {Promise<Object>} - An object containing the duel count for each user, the total duels, and duels per banlist.
 */
async function countAllUserDuels(pattern) {
	const keys = await client.keys(pattern);
	let duelCounts = [];
	let totalDuels = 0;
	let banlistCounts = {};

	for (const key of keys) {
		console.log("🚀 ~ key:", key)
		const user = key.split(':')[1];
		const listLength = await client.lLen(key);
		duelCounts.push({ user, listLength });
		totalDuels += listLength;

		for (let i = 0; i < listLength; i++) {
			const listItemJson = await client.lIndex(key, i);
			const listItem = JSON.parse(listItemJson);
			const banlistName = listItem.banlistName;

			if (banlistCounts[banlistName]) {
				banlistCounts[banlistName]++;
			} else {
				banlistCounts[banlistName] = 1;
			}
		}
	}

	return { duelCounts, totalDuels, banlistCounts };
}

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

// Execute the list update process
(async () => {
	try {
		const pattern = 'user:*:duels';
		const result = await countAllUserDuels(pattern);

		// Order the results by the number of duels in descending order
		const orderedDuelCounts = result.duelCounts.sort((a, b) => b.listLength - a.listLength);
		console.log("Total Players:", orderedDuelCounts.length);
		console.log("Total Duels:", result.totalDuels);
		console.log("Duels per Banlist:", result.banlistCounts);
		console.log("Duels per User:", orderedDuelCounts);

		//Save results in redis
		const date = new Date();
		const dateString = date.toISOString().split('T')[0];
		const key = `report:duels:${dateString}`;
		const data = {
			totalPlayers: orderedDuelCounts.length,
			totalDuels: result.totalDuels,
			duelsPerBanlist: result.banlistCounts,
			duelsPerUser: orderedDuelCounts
		};
		const report = JSON.stringify(data);
		await client.set(key, report);

		console.log(`Report saved to Redis key: ${key}`);

	} catch (e) {
		await handleError(e);
	} finally {
		client.quit();
	}
})();
