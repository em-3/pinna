<script>
    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    @media (min-width: 64em) {
        div {
            gap: 20px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
</style>