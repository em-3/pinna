<script lang="ts">
    import { DateTime } from "luxon";
    import Modal from "./Modal.svelte";
    import { generateReportFromConfig } from "$lib/stores/report.svelte";
    import { pushState } from "$app/navigation";

    let startDateRaw = $state("");
    let endDateRaw = $state("");

    const startDate: DateTime = $derived(DateTime.fromISO(startDateRaw))
    const endDate: DateTime = $derived(DateTime.fromISO(endDateRaw));

    function generateReport() {
        // Generate the report
        generateReportFromConfig(startDate, endDate);

        // Close the modal
        pushState("", {});
    }
</script>

<Modal title="New Report">
    <div class="date-select">
        <div class="date">
            <label for="startDate">Start Date:</label>
            <input type="date" id="startDate" bind:value={startDateRaw}>
        </div>
        <div class="date">
            <label for="endDate">End Date:</label>
            <input type="date" id="endDate" bind:value={endDateRaw}>
        </div>
    </div>
    <div class="controls">
        <button onclick={() => history.back()}>Cancel</button>
        <button onclick={() => generateReport()}>Generate</button>
    </div>
</Modal>

<style>
    .date-select, .controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 10px;
    }

    .date {
        display: contents;
    }
</style>