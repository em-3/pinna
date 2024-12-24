import type { ConfigData } from "./types/ConfigData";

import { BaseDirectory, exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

// The config file name
const configFilePath = "config.json";

// Create the initial config object with default values
let configStore: { config: ConfigData } = $state({
    config: {
        instance: {
            url: "",
            token: "",
            projectName: ""
        }
    }
});

/**
 * Loads the configuration from the disk, replacing the config currently in memory. If the config file does not exist, this function will create it with the default values. Should only be called at the start of the application.
 * @throws An error if the file cannot be read or is invalid
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

    // Move the data into the reactive store
    configStore.config = parsedConfig;
}

/**
 * Saves the current configuration to the disk.
 * @throws An error if the file cannot be read or is invalid
 */
async function saveConfig() {
    // Create the config directory if it doesn't exist
    await mkdir("", {
        baseDir: BaseDirectory.AppData,
        recursive: true
    });

    // Copy the config and convert it to JSON
    const configJSON = JSON.stringify($state.snapshot(configStore).config, null, 2);

    await writeTextFile(configFilePath, configJSON, {
        baseDir: BaseDirectory.AppData
    });
}

export { configStore, loadConfig, saveConfig };