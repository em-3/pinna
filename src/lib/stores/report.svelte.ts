import type { PinnaReport } from "../types/PinnaReport";

import { DateTime } from "luxon";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { open, save } from "@tauri-apps/plugin-dialog";
import { createReport } from "$lib/reportGenerator";
import { configStore } from "./config.svelte";
import { pushState } from "$app/navigation";

// Create the initial report object with default values
export const reportStore: { report: PinnaReport | null } = $state({
    report: null
});

/**
 * Reads the report from a user-selected file on the disk, replacing the report currently in memory.
 * @throws An error if the file cannot be read or is invalid
 */
async function loadReportFromFile() {
    // Ask the user for a file
    const filePath = (await open({
        multiple: false,
        directory: false,
        filters: [
            {
                name: "JSON Files",
                extensions: ["json"]
            }
        ],
        title: "Import Report"
    }));

    if(!filePath) {
        return;
    }

    // Throw an error if the file does not exist
    if(!(await exists(filePath))) {
        throw new Error(`Could not read file '${filePath}' because it does not exist.`);
    }

    // Read the report from the file
    const reportJSON = await readTextFile(filePath);

    let parsedReport: PinnaReport;
    
    try {
        parsedReport = JSON.parse(reportJSON);
    }catch(error) {
        throw new Error(`The selected file did not contain valid JSON.`);
    }

    // "Validate" that the parsed JSON is a report by checking if the ID field is present
    if(!parsedReport.pinnaID) {
        throw new Error(`The selected file did not contain a valid report.`);
    }

    // Move the report into the reactive store
    reportStore.report = parsedReport;
}

/**
 * Generates a report using the provided dates and information stored in the config, replacing the current in-memory report.
 * @param startDate The start date for the report
 * @param endDate The end date for the report
 */
async function generateReportFromConfig(startDate: DateTime, endDate: DateTime) {
    const { url, projectName, selectedUsers, storyPointsField, token } = configStore.config.jiraConfig;

    // Generate the report
    const generatedReport = await createReport(url, startDate, endDate, selectedUsers, projectName, storyPointsField, token);

    // Update the stored report
    reportStore.report = generatedReport;
}

/**
 * Saves the current report to a user-selected file on the disk.
 */
async function saveReportToFile() {
    const filePath = await save({
        filters: [
            {
                name: "JSON Files",
                extensions: ["json"]
            }
        ]
    });

    if(!filePath) {
        return;
    }

    // Copy the report and convert it to JSON
    const reportJSON = JSON.stringify($state.snapshot(reportStore).report, null, 2);

    await writeTextFile(filePath, reportJSON);
}

function showReportModal() {
    pushState("", {
        showReportModal: true
    });
}

export { loadReportFromFile, generateReportFromConfig, saveReportToFile, showReportModal };