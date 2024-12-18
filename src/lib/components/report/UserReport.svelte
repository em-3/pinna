<script>
    import { CircleCheck, CircleDot, CircleAlert, CircleDashed, CircleFadingArrowUp } from "lucide-svelte";
    import CategoryReport from "./CategoryReport.svelte";
    import SummaryGrid from "./summary/SummaryGrid.svelte";
    import SummaryItem from "./summary/SummaryItem.svelte";
    import { formatHours } from "$lib/formattedTime";

    let { id = undefined, name, reviewed, developed, changesRequested, unassigned, inProgress } = $props();

    // Calculate the total points and seconds by summing each issue's individual values
    let totalDevelopedPoints = $derived(developed.reduce((total, current) => total + current.storyPoints, 0));
    let totalReviewedPoints = $derived(reviewed.reduce((total, current) => total + current.storyPoints, 0));
    let totalSeconds = $derived(reviewed.concat(developed, changesRequested, unassigned, inProgress).reduce((total, current) => total + current.seconds, 0));
</script>

<section { id }>
    <header>
        <h1>Report for { name }</h1>
    </header>
    <SummaryGrid>
        <SummaryItem total={formatHours(totalSeconds)} name="Hours Spent" />
        <SummaryItem total={totalDevelopedPoints} name="Developed Points" />
        <SummaryItem total={totalReviewedPoints} name="Reviewed Points" />
    </SummaryGrid>
    <div class="report-grid">
        <CategoryReport name="Reviewed" issues={reviewed} Icon={CircleCheck}></CategoryReport>
        <CategoryReport name="Developed" issues={developed} Icon={CircleDot}></CategoryReport>
        <CategoryReport name="Changes Requested" issues={changesRequested} Icon={CircleAlert}></CategoryReport>
        <CategoryReport name="Unassigned" issues={unassigned} Icon={CircleDashed}></CategoryReport>
        <CategoryReport name="In Progress" issues={inProgress} Icon={CircleFadingArrowUp}></CategoryReport>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    header {
        color: var(--accent-color);
    }

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