// Modified implementation of michaelbelete's media query store
// https://github.com/michaelbelete/svelte-media-query-store/blob/785ece3e11eb4a4908615237b0b32147f650c46d/src/lib/mediaQueryStore.ts

import { readable } from "svelte/store";

function mediaQueryStore(query: string) {
	const mediaQuery = window.matchMedia(query);

	const store = readable(mediaQuery.matches, (set) => {
		const updateStore = () => set(mediaQuery.matches);

		mediaQuery.addEventListener("change", updateStore);

		updateStore();

		return () => mediaQuery.removeEventListener("change", updateStore);
	});

	return store;
}

export default mediaQueryStore;
