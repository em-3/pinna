import type { ConfigData } from "./types/ConfigData";

import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

// The config file name
const configFilePath = "config.json";

// Create the initial config object with default values
let config: ConfigData = $state({
    instance: {
        url: "",
        token: "",
        projectName: ""
    }
});

/**
 * Loads the configuration from the disk, replacing any config currently in memory. If the config file does not exist, this function will create it with the default values. Should only be called at the start of the application.
 */
async function loadConfig() {
    // Check if the directory exists.
    const configExists = await exists(configFilePath, {
        baseDir: BaseDirectory.AppData
    });

    if(!configExists) {
        // If it doesn't, then write the default values
        await saveConfig();
        return;
    }

    // Read the current config value
    const configJSON = await readTextFile(configFilePath, {
        baseDir: BaseDirectory.AppData
    });

    const parsedConfig: ConfigData = JSON.parse(configJSON);

    // Move the values into the reactive store
    config.instance = parsedConfig.instance;
}

/**
 * Saves the current configuration to the disk.
 */
async function saveConfig() {
    // Create the config directory if it doesn't exist
    await mkdir("", {
        baseDir: BaseDirectory.AppData,
        recursive: true
    });

    // Copy the config and convert it to JSON
    const configJSON = JSON.stringify($state.snapshot(config), null, 2);

    await writeTextFile(configFilePath, configJSON, {
        baseDir: BaseDirectory.AppData
    });
}

export { config, loadConfig, saveConfig };