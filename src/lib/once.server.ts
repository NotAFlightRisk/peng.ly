const asked = new Map<string, Promise<unknown>>();

// loads o' pages want the same fings, so each one only gets asked for the once
export const once = <T>(key: string, ask: () => Promise<T>) => {
	if (!asked.has(key)) {
		asked.set(
			key,
			ask().catch((error) => {
				// a duff answer don't get remembered, so the next one to ask tries again
				asked.delete(key);
				throw error;
			})
		);
	}
	return asked.get(key) as Promise<T>;
};
