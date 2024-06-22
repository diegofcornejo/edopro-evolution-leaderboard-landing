import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  {files: ["**/*.js", "**/*.mjs", "**/*.ts"] ,languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
	eslintPluginUnicorn.configs['flat/recommended'],
		{
			rules: {
				'unicorn/better-regex': 'warn',
			},
		}
];