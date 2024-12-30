<script lang="ts">
    import type { PinnaReport } from "$lib/types/PinnaReport";

    import UserReport from "./UserReport.svelte";
    import SummaryGrid from "$lib/components/report/summary/SummaryGrid.svelte";
    import SummaryItem from "$lib/components/report/summary/SummaryItem.svelte";
    import { formatHours } from "$lib/utils";
    import { generateReportSummary } from "$lib/reportSummary";
    import { DateTime } from "luxon";

    let { data }: { data: PinnaReport } = $props();

    // Generate a summary for the report
    const summary = $derived(generateReportSummary(data));

    // Format the timestamps
    const startDate = $derived(DateTime.fromISO(data.startDate));
    const endDate = $derived(DateTime.fromISO(data.endDate));
</script>

<section class="report">
    <section id="overview">
        <header>
            <h1>Report Summary</h1>
            <h2>From { startDate.toLocaleString() } to { endDate.toLocaleString() }</h2>
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
        <UserReport id={ userReport.user.username } userData={ userReport } summary={ summary.userSummaries[index] }></UserReport>
        {/each}
    </section>
</section>

<style>
    #overview {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    #overview header {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    #overview header h2 {
        color: var(--accent-color);
        font-size: 1.25em;
    }

    .report {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 60px;
    }

    .user-reports {
        display: flex;
        flex-direction: column;
        gap: 60px;
    }
</style>