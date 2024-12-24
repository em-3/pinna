<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { loadReportFromFile } from "$lib/report.svelte";
    import { FileInput, FilePlus2, Home, Settings } from "lucide-svelte";

    function loadReport() {
        loadReportFromFile()
        .then(() => {
            goto("/");
        })
        .catch((error) => {
            console.log(error);
        });
    }
</script>

<nav>
    <a class="link" href="/" class:active={page.url.pathname == "/"}>
        <Home />
        <span>Home</span>
    </a>
    <a class="link" href="/new" class:active={page.url.pathname == "/new"}>
        <FilePlus2 />
        <span>New</span>
    </a>
    <button class="link" onclick={loadReport}>
        <FileInput />
        <span>Load</span>
    </button>
    <a class="link" href="/settings" class:active={page.url.pathname == "/settings"}>
        <Settings />
        <span>Settings</span>
    </a>
</nav>

<style>
    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: space-evenly;
        background-color: var(--menu-color);
        backdrop-filter: blur(20px);
        z-index: 1;

        view-transition-name: navbar;
    }

    nav .link {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px;
        text-decoration: none;
        background-color: transparent;
        color: var(--text-color);
        font-size: 1em;
        border-radius: 15px;
    }

    nav .link::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        border-bottom: 3px solid var(--accent-color);
        transform-origin: center;
        transform: scaleX(0);
        transition: 300ms transform ease-out;
    }

    nav .link.active::after {
        transform: scaleX(1);
    }

    @media (min-width: 64em) {
        nav {
            position: static;
            border-top: none;
            display: inline-flex;
            justify-content: flex-start;
            width: initial;
        }

        nav a {
            flex-direction: row;
            font-size: 0.75em;
        }
    }

    ::view-transition-group(navbar) {
        /* Fix for weird view transition stacking issues */
        /* https://www.nicchan.me/blog/view-transitions-and-stacking-context/ */
        z-index: 1;
    }

    ::view-transition-old(navbar) {
        /* Stop the old navbar from displaying at all */
        display: none;
    }

    ::view-transition-new(navbar) {
        /* Prevent the fade-in on the new navbar */
        animation: none;
    }
</style>