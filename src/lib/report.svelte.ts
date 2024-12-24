import type { ReportData } from "./types/ReportData";

import { exists, readTextFile } from "@tauri-apps/plugin-fs";
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
    // Ask the user for a file=
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

    // Throw an error if the file does not exist
    if(!(await exists(filePath))) {
        throw new Error(`Could not read file '${filePath}' because it does not exist.`);
    }

    // Read the report from the file
    const reportJSON = await readTextFile(filePath);

    let parsedReport: ReportData;
    
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

export { reportStore, loadReportFromFile };