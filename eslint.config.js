import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,
	...svelte.configs["flat/recommended"],
	...svelte.configs["flat/prettier"],
	{
		plugins: {
			perfectionist
		},
		rules: {
			"perfectionist/sort-imports": [
				"error",
				{
					type: "alphabetical",
					order: "asc",
					ignoreCase: true,
					internalPattern: ["~/**"],
					newlinesBetween: "always",
					maxLineLength: undefined,
					groups: [
						"type",
						["builtin", "external"],
						"internal-type",
						"internal",
						["parent-type", "sibling-type", "index-type"],
						["parent", "sibling", "index"],
						"object",
						"unknown"
					],
					customGroups: { type: {}, value: {} },
					environment: "node"
				}
			],
			"perfectionist/sort-exports": [
				"error",
				{
					type: "alphabetical",
					order: "asc",
					ignoreCase: true
				}
			],
			"perfectionist/sort-svelte-attributes": [
				"error",
				{
					type: "alphabetical",
					order: "asc",
					ignoreCase: true,
					groups: [],
					customGroups: {}
				}
			]
		}
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"]
	}
];
