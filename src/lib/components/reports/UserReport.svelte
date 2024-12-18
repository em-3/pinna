<script>
    import { CircleCheck, CircleDot, CircleAlert, CircleDashed, CircleFadingArrowUp } from "lucide-svelte";
    import ReportTable from "./IssuesTable.svelte";
    import SummaryItem from "./SummaryItem.svelte";
    import { formatHours } from "$lib/formattedTime";

    let { name, reviewed, developed, changesRequested, unassigned, inProgress } = $props();

    // Calculate the total points and seconds by summing each issue's individual values
    let totalDevelopedPoints = $derived(developed.reduce((total, current) => total + current.storyPoints, 0));
    let totalReviewedPoints = $derived(reviewed.reduce((total, current) => total + current.storyPoints, 0));
    let totalSeconds = $derived(reviewed.concat(developed, changesRequested, unassigned, inProgress).reduce((total, current) => total + current.seconds, 0));
</script>

<section>
    <header>
        <h1>Summary for { name }</h1>
    </header>
    <div class="summary-grid">
        <SummaryItem total={formatHours(totalSeconds)} name="Hours Spent" />
        <SummaryItem total={totalDevelopedPoints} name="Developed Points" />
        <SummaryItem total={totalReviewedPoints} name="Reviewed Points" />
    </div>
    <div class="report-grid">
        <ReportTable name="Reviewed" issues={reviewed} Icon={CircleCheck}></ReportTable>
        <ReportTable name="Developed" issues={developed} Icon={CircleDot}></ReportTable>
        <ReportTable name="Changes Requested" issues={changesRequested} Icon={CircleAlert}></ReportTable>
        <ReportTable name="Unassigned" issues={unassigned} Icon={CircleDashed}></ReportTable>
        <ReportTable name="In Progress" issues={inProgress} Icon={CircleFadingArrowUp}></ReportTable>
    </div>
</section>

<style>
    section {
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    header {
        color: var(--accent-color);
    }

    .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 5px;
    }

    .report-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @media (min-width: 64em) {
        .summary-grid {
            gap: 20px;
        }

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