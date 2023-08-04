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

// Function to update the list in Redis
/**
 * Updates the list stored in Redis, removing the 'deck' property from each player object.
 * @param {string} listKey - The key of the list in Redis.
 * @returns {Promise<void>}
 */
async function updateList(listKey) {
	const listLength = await client.lLen(listKey);

	for (let i = 0; i < listLength; i++) {
		const listItemJson = await client.lIndex(listKey, i);
		const listItem = JSON.parse(listItemJson);
		const updatedPlayers = listItem.players.map(player => {
			const updatedPlayer = { ...player };
			delete updatedPlayer.deck; // Remove the 'deck' property from the player object
			return updatedPlayer;
		});
		listItem.players = updatedPlayers;
		await client.lSet(listKey, i, JSON.stringify(listItem));
	}
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
		// Get the keys that match the pattern 'user:*:duels'
		const keys = await client.keys('user:*:duels');

		// Update the lists for each matching key
		for (const key of keys) {
			console.log("🚀 ~ KEY:", key)
			await updateList(key);
		}

		console.log('The lists have been successfully updated in Redis.');
	} catch (e) {
		await handleError(e);
	} finally {
		client.quit();
	}
})();