<script>
    import "../app.css";

    let { children } = $props();
</script>

<main>
    {@render children()}
</main>

<style>
    main {
        min-height: 100%;
        max-width: 95em;
        margin: 0 auto;
    }
</style>