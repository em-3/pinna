<script lang="ts">
    import type { PinnaReport } from "$lib/types/PinnaReport";

    import UserReport from "./UserReport.svelte";
    import SummaryGrid from "$lib/components/report/summary/SummaryGrid.svelte";
    import SummaryItem from "$lib/components/report/summary/SummaryItem.svelte";
    import { formatHours } from "$lib/utils";
    import { generateReportSummary } from "$lib/reportSummary";
    import { DateTime } from "luxon";
    import { saveReportToFile } from "$lib/stores/report.svelte";

    let { data }: { data: PinnaReport } = $props();

    // Generate a summary for the report
    const summary = $derived(generateReportSummary(data));

    // Format the timestamps
    const startDate = $derived(DateTime.fromISO(data.startDate));
    const endDate = $derived(DateTime.fromISO(data.endDate));
</script>

<div class="wrapper">
    <div class="quick-links-wrapper">
        <section>
            <h2>Jump to...</h2>
            <div class="quick-links scroll-section">
                <a href="#overview">Overview</a>
                {#each data.userReports as userReport (userReport.user.id)}
                <a href="#{userReport.user.id}">{ userReport.user.nickname ?? userReport.user.displayName }</a>
                {/each}
            </div>
        </section>
    </div>
    <section class="report scroll-section">
        <section id="overview">
            <header>
                <h1>Report Summary</h1>
                <h2>From { startDate.toLocaleString() } to { endDate.toLocaleString() }</h2>
                <section class="export-options">
                    <button onclick={saveReportToFile}>Save to File</button>
                </section>
            </header>
            <SummaryGrid>
                <SummaryItem total={ formatHours(summary.seconds.total) } name="Total Hours Spent" subtitle="Median: { formatHours(summary.seconds.median) } / Std. Dev. { formatHours(summary.seconds.standardDeviation) }"></SummaryItem>
                <SummaryItem total={ summary.reviewed.total } name="Total Reviewed Points" subtitle="Median: { summary.reviewed.median } / Std. Dev. { summary.reviewed.standardDeviation }"></SummaryItem>
                <SummaryItem total={ summary.developed.total } name="Total Developed Points" subtitle="Median: { summary.developed.median } / Std. Dev. { summary.developed.standardDeviation }"></SummaryItem>
                <SummaryItem total={ summary.combined.total } name="Total Combined Points" subtitle="Median: { summary.combined.median } / Std. Dev. { summary.combined.standardDeviation }"></SummaryItem>
            </SummaryGrid>
        </section>
        <section class="user-reports">
            {#each data.userReports as userReport, index (userReport.user.id)}
            <UserReport id={ userReport.user.id } userData={ userReport } summary={ summary.userSummaries[index] }></UserReport>
            {/each}
        </section>
    </section>
</div>

<style>
    #overview {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    #overview header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    #overview header h2 {
        color: var(--accent-color);
        font-size: 1.25em;
    }

    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
    }

    .quick-links-wrapper, .report {
        padding: 10px;
    }

    .quick-links-wrapper, .quick-links-wrapper section {
        overflow: hidden;
    }

    .quick-links-wrapper section {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .quick-links {
        display: flex;
        white-space: nowrap;
        overflow-x: auto;
        gap: 10px;
    }

    .quick-links a {
        text-decoration: none;
    }

    .report, .user-reports {
        display: flex;
        flex-direction: column;
        gap: 60px;
    }

    .report {
        overflow-y: auto;
    }

    @media (min-width: 64em) {
        .wrapper {
            grid-template-columns: 1fr 5fr 1fr;
        }

        .quick-links {
            flex-direction: column;
        }
    }
</style>