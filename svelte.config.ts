// Tauri doesn't have a Node.js server to do proper SSR
// so we will use adapter-static to prerender the app (SSG)
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import adapter from "@sveltejs/adapter-static";
import { Config } from "@sveltejs/kit";

const config: Config = {
  kit: {
    adapter: adapter(),
  },
};

export default config;
