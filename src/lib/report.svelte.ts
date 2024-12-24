import type { ReportData } from "./types/ReportData";

import { readTextFile } from "@tauri-apps/plugin-fs";
import { open } from "@tauri-apps/plugin-dialog";

// Create the initial report object with default values
const reportStore: { report: ReportData | undefined } = $state({
    report: undefined
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
    })) as string;

    if(!filePath) {
        return;
    }

    // Read the report from the file
    const reportJSON = await readTextFile(filePath);

    const parsedReport: ReportData = JSON.parse(reportJSON);

    // Move the report into the reactive store
    reportStore.report = parsedReport;
}

export { reportStore, loadReportFromFile };