export default class LocalStorageHelper<T> {
	save(data: T, storageKey: string) {
		const jsonData = JSON.stringify(data);
		localStorage.setItem(storageKey, jsonData);
	}

	load(storageKey: string): T | null {
		const jsonData = localStorage.getItem(storageKey);
		if (jsonData) {
			return JSON.parse(jsonData) as T;
		}
		return null;
	}

	clear(storageKey: string) {
		localStorage.removeItem(storageKey);
	}
}
