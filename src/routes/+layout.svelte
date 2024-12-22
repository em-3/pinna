<script>
    import { onNavigate } from "$app/navigation";
    import { FileInput, FilePlus2, Home, Settings } from "lucide-svelte";
    import "../app.css";

    let { children } = $props();

    // https://svelte.dev/blog/view-transitions
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<nav>
    <a href="/">
        <Home />
        <span>Home</span>
    </a>
    <a href="/new/">
        <FilePlus2 />
        <span>New</span>
    </a>
    <a href="/load/">
        <FileInput />
        <span>Load</span>
    </a>
    <a href="/settings/">
        <Settings />
        <span>Settings</span>
    </a>
</nav>

<main>
    {@render children()}
</main>

<style>
    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #f6f6f680;
        backdrop-filter: blur(20px);
        z-index: 1;

        view-transition-name: navbar;
    }

    nav a {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        text-decoration: none;
        color: var(--text-color);
        font-size: 1em;
    }

    main {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 95em;
        margin: 0 auto;
        margin-bottom: 5em;

        view-transition-name: content;
    }

    @media (min-width: 64em) {
        nav {
            position: static;
            border-top: none;
            justify-content: flex-start;
        }

        nav a {
            flex-direction: row;
            font-size: 0.75em;
        }

        main {
            margin-bottom: 0;
        }
    }

    /* View transitions for content */

    @keyframes slide-from-right {
        0%, 25% {
            transform: scale(75%) translateX(-100vw);
            opacity: 0;
        }

        50% {
            transform: scale(75%) translateX(0);
            opacity: 50%;
        }

        100% {
            transform: scale(100%) translateX(0);
            opacity: 100%;
        }
    }

    @keyframes slide-to-left {
        25% {
            transform: scale(75%);
            opacity: 50%;
        }

        50%, 100% {
            transform: scale(75%) translateX(100vw);
            opacity: 0%;
        }
    }

    ::view-transition-old(content) {
        animation:
            500ms ease-in both slide-to-left;
    }

    ::view-transition-new(content) {
        animation:
            500ms ease-out both slide-from-right;
    }

    ::view-transition-group(navbar) {
        /* Fix for weird view transition stacking issues */
        /* https://www.nicchan.me/blog/view-transitions-and-stacking-context/ */
        z-index: 1;
    }

    @media (prefers-reduced-motion) {
        ::view-transition-group(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
            animation: none !important;
        }
    }
</style>