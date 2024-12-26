<script lang="ts">
    import type { UserReport } from "$lib/types/ReportData";
    import type { UserSummary } from "$lib/types/ReportSummary";

    import { CircleCheck, CircleDot, CircleAlert, CircleDashed, CircleFadingArrowUp } from "lucide-svelte";
    import CategoryReport from "./CategoryReport.svelte";
    import SummaryGrid from "$lib/components/report/summary/SummaryGrid.svelte";
    import SummaryItem from "$lib/components/report/summary/SummaryItem.svelte";
    import { formatHours } from "$lib/formattedTime";

    let { id = undefined, userData, summary }: { id: any, userData: UserReport, summary: UserSummary } = $props();
</script>

<section { id }>
    <header>
        <h1>Report for { userData.name }</h1>
    </header>
    <SummaryGrid>
        <SummaryItem total={formatHours(summary.totalSeconds)} name="Hours Spent" />
        <SummaryItem total={summary.data.reviewed.totalPoints} name="Reviewed Points" />
        <SummaryItem total={summary.data.developed.totalPoints} name="Developed Points" />
        <SummaryItem total={summary.combinedPoints} name="Combined Points" />
    </SummaryGrid>
    <div class="report-grid">
        <CategoryReport name="Reviewed" worklogs={userData.data.reviewed} summary={ summary.data.reviewed } Icon={CircleCheck}></CategoryReport>
        <CategoryReport name="Developed" worklogs={userData.data.developed} summary={ summary.data.developed } Icon={CircleDot}></CategoryReport>
        <CategoryReport name="Changes Requested" worklogs={userData.data.changesRequested} summary={ summary.data.changesRequested } Icon={CircleAlert}></CategoryReport>
        <CategoryReport name="Unassigned" worklogs={userData.data.unassigned} summary={ summary.data.unassigned } Icon={CircleDashed}></CategoryReport>
        <CategoryReport name="In Progress" worklogs={userData.data.inProgress} summary={ summary.data.inProgress } Icon={CircleFadingArrowUp}></CategoryReport>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    /* header {
        color: var(--accent-color);
    } */

    .report-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @media (min-width: 64em) {
        .report-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 80em) {
        .report-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>