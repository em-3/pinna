<script>
    let { total, name } = $props();
</script>

<div>
    <h3>{total}</h3>
    <p>{name}</p>
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
    }

    h3 {
        color: var(--secondary-accent-color);
    }
</style>