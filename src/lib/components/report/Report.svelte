<script lang="ts">
    import UserReport from "$lib/components/report/UserReport.svelte";
    import SummaryGrid from "./summary/SummaryGrid.svelte";
    import SummaryItem from "./summary/SummaryItem.svelte";
    import { formatHours } from "$lib/formattedTime";
    import { generateReportSummary } from "$lib/reportSummary";

    let { data } = $props();

    // Generate a summary for the report
    const summary = $derived(generateReportSummary(data));
</script>

<section class="report">
    <section id="overview">
        <header>
            <h1>Summary</h1>
        </header>
        <SummaryGrid>
            <SummaryItem total={ formatHours(summary.seconds.total) } name="Total Hours Spent" subtitle="Median: { formatHours(summary.seconds.median) } / Std. Dev. { formatHours(summary.seconds.standardDeviation) }"></SummaryItem>
            <SummaryItem total={ summary.reviewed.total } name="Total Reviewed Points" subtitle="Median: { summary.reviewed.median } / Std. Dev. { summary.reviewed.standardDeviation }"></SummaryItem>
            <SummaryItem total={ summary.developed.total } name="Total Developed Points" subtitle="Median: { summary.developed.median } / Std. Dev. { summary.developed.standardDeviation }"></SummaryItem>
        </SummaryGrid>
    </section>
    <section class="user-reports">
        {#each data.users as user, index (user.id)}
        <UserReport id={ user.id } userData={ user } summary={ summary.users[index] }></UserReport>
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
        color: var(--accent-color);
    }

    .report {
        padding: 0 10px;
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