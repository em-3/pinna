import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { writable } from "svelte/store";

/**
 * The config structure for the application
 */
interface Config {
	/**
	 * Whether the initial setup process has been completed by the user
	 */
	setupComplete: boolean;
}

const configPath = "config.json";

const defaultConfig: Config = {
	setupComplete: false
};

function createConfigStore() {
	//Create the store
	const config = writable<Config>(defaultConfig);

	let currentConfig = defaultConfig;

	async function init() {
		if (!(await exists(configPath, { dir: BaseDirectory.AppData }))) {
			//Write the default config
			await createDir("", { dir: BaseDirectory.AppData, recursive: true });
			await writeTextFile(configPath, JSON.stringify(defaultConfig), {
				dir: BaseDirectory.AppData
			});

			config.set(defaultConfig);
		} else {
			//Read the existing config
			currentConfig = JSON.parse(await readTextFile(configPath, { dir: BaseDirectory.AppData }));

			config.set(currentConfig);
		}

		//Whenever a config entry is changed, write that value to the disk
		config.subscribe(async (value) => {
			//Prevent unnecessary disk operations if the config didn't change
			if (currentConfig == value) {
				return;
			}

			await writeTextFile(configPath, JSON.stringify(value), {
				dir: BaseDirectory.AppData
			});
		});
	}

	return { config, init };
}

export { type Config, createConfigStore };
