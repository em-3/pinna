<script>
    import { formatSeconds } from "$lib/formattedTime";

    let { name, issues, Icon = undefined } = $props();

    let totalPoints = $derived(issues.reduce((total, current) => total + current.storyPoints, 0));
    let totalSeconds = $derived(issues.reduce((total, current) => total + current.seconds, 0));
</script>

<div class="container">
    <div class="title">
        <Icon></Icon>
        <h2>{ name }</h2>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">Issue ID</th>
                <th scope="col">Name</th>
                <th scope="col">Story Points</th>
                <th scope="col">Time Spent</th>
            </tr>
        </thead>
        <tbody>
            {#each issues as issue }
            <tr>
                <th scope="row">{ issue.id }</th>
                <td>{ issue.name }</td>
                <td>{ issue.storyPoints }</td>
                <td>{ formatSeconds(issue.seconds) }</td>
            </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th scope="row" style="grid-column: span 2;">Total</th>
                <td>{ totalPoints }</td>
                <td>{ formatSeconds(totalSeconds) }</td>
            </tr>
        </tfoot>
    </table>
</div>

<style>
    .container {
        margin: 10px;
        padding: 10px;
        background-color: var(--secondary-background-color);
        border-radius: 25px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        margin: 10px 0;
        color: var(--accent-color);
    }

    table {
        display: grid;
        grid-template-columns: 2fr 4fr 1fr 1fr;
    }

    thead, tbody, tfoot, tr {
        display: contents;
    }

    th, td {
        padding: 10px;
        word-break: break-word;
        text-align: left;
        align-content: center;
        transition: ease-in 0.2s background-color;
    }

    tbody tr:hover td, tbody tr:hover th {
        background-color: var(--secondary-color);
    }

    tbody th, tbody td {
        border-bottom: 1px solid var(--tertiary-color);
    }

    th:not(:last-child), td:not(:last-child) {
        border-right: 1px solid var(--tertiary-color);
    }

    thead th,
    tbody tr:last-child th,
    tbody tr:last-child td {
        border-bottom: 3px solid var(--tertiary-color);
    }
</style>