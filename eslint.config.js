import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Linting is deliberately syntax-only: the type-aware presets would need a second,
// full type-check of every file on top of `npm run typecheck`, which already covers it.
export default tseslint.config(
    {
        // `documentation/` is a verbatim vendored copy of the SPE Book; `dist/` is build output.
        ignores: ['dist/**', 'src/tools/powershell/documentation/**'],
    },
    {
        files: ['**/*.{js,mjs,ts}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        extends: [js.configs.recommended],
    },
    {
        files: ['**/*.ts'],
        extends: [tseslint.configs.recommended],
        rules: {
            // A leading underscore is how this codebase spells "positional, unused" —
            // regex capture groups it must skip, callback parameters it does not read.
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                // `const { Link, ...rest } = facet` is how the projection code drops a field.
                ignoreRestSiblings: true,
            }],
            // Four loosely-typed remote surfaces (CLIXML, GraphQL, REST, SPE) mean `any`
            // is still load-bearing here. A warning keeps the count visible without
            // failing the build on debt that predates the linter.
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        // Tool registration lives in src/; tests register stubs under names of their own.
        files: ['src/**/*.ts'],
        rules: {
            // A tool name is not free-standing: a client prefixes it before sending it to
            // the model. Claude Code spells that `mcp__<server key>__<tool>`, and the
            // Anthropic API caps the result at 64 characters -- a tool whose prefixed name
            // runs over is dropped from the session, with nothing in this server's logs to
            // say so. The README's own config key is `sitecore-mcp`, so the overhead is
            // `mcp__` + `sitecore-mcp` + `__` = 19, leaving 45. The longest name today is
            // `presentation-remove-rendering-parameter` at 39.
            //
            // This catches the literal passed to `registerTool`. It cannot see the two
            // GraphQL tools, whose names are template strings ending in a schema from
            // `GRAPHQL_SCHEMAS`: `introspection-graphql-` leaves 23 characters for the
            // schema name at runtime.
            'no-restricted-syntax': ['error', {
                selector: "CallExpression[callee.property.name='registerTool'] > Literal[value.length>45]",
                message: 'Tool name is longer than 45 characters. Prefixed as mcp__<server>__<tool> it overruns the 64-character limit the client enforces, and the tool is silently dropped.',
            }],
        },
    },
    {
        // Test doubles stub SDK objects structurally; `any` is the point, not debt.
        files: ['tests/**/*.ts'],
        rules: { '@typescript-eslint/no-explicit-any': 'off' },
    },
);
