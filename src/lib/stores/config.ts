import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { writable } from "svelte/store";

interface SessionBackend {
	/**
	 * The domain of the Jira installation
	 */
	jiraDomain: string;
	/**
	 * The session ID of a logged in user, derived from the browser cookie `jsessionid`
	 */
	sessionID: string;
	/**
	 * The Cross Site Request Forgery Token used to validate the other cookies, derived from the browser cookie `atlassian.xsrf.token`
	 */
	crossSiteToken: string;
	/**
	 * The crowd token key, derived from the browser cookie `crowd.token_key`
	 */
	crowdTokenKey: string;
}

/**
 * The config structure for the application
 */
interface Config {
	backend: SessionBackend;
}

const configPath = "config.json";

const defaultConfig: Config = {
	backend: {
		jiraDomain: "",
		sessionID: "",
		crossSiteToken: "",
		crowdTokenKey: ""
	}
};

function createConfigStore() {
	//Create the store
	const config = writable<Config>(defaultConfig);

	let currentConfig = defaultConfig;

	async function init() {
		if (!(await exists(configPath, { dir: BaseDirectory.AppData }))) {
			//Write the default config
			await createDir("", { dir: BaseDirectory.AppData, recursive: true });
			await writeTextFile(configPath, JSON.stringify(defaultConfig, null, 2), {
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

			await writeTextFile(configPath, JSON.stringify(value, null, 2), {
				dir: BaseDirectory.AppData
			});
		});
	}

	return { config, init };
}

export { type Config, createConfigStore };
