<script>
    let { total, name, subtitle = null } = $props();
</script>

<div>
    <h3>{total}</h3>
    <h4>{name}</h4>
    {#if subtitle}
    <p>{subtitle}</p>
    {/if}
</div>

<style>
    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        background-color: var(--secondary-background-color);
        border-radius: 25px;
        gap: 5px;
    }

    h3 {
        color: var(--secondary-accent-color);
    }
</style>