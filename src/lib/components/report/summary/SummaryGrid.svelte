<script>
    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 5px;
    }

    @media (min-width: 64em) {
        div {
            gap: 20px;
        }
    }
</style>