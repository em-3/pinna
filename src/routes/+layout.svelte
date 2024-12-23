<script>
    import "../app.css";
    import { onNavigate } from "$app/navigation";
    import Navigation from "$lib/components/Navigation.svelte";

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

<Navigation></Navigation>

<main>
    {@render children()}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        max-width: 95em;
        margin: 0 auto;
        margin-bottom: 5em;

        view-transition-name: content;
    }

    @media (min-width: 64em) {
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
            transform: translateX(100vw);
            opacity: 0%;
        }
    }

    ::view-transition-old(content) {
        transform-origin: top;
        animation:
            500ms ease-in both slide-to-left;
    }

    ::view-transition-new(content) {
        transform-origin: top;
        animation:
            500ms ease-out both slide-from-right;
    }

    @media (prefers-reduced-motion) {
        ::view-transition-group(*),
        ::view-transition-old(*),
        ::view-transition-new(*) {
            animation: none !important;
        }
    }
</style>