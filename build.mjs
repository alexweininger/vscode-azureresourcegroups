import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'out.js',
    platform: 'node',
    mainFields: ['module', 'main'],
    external: ['vscode'],
    minify: true,
    keepNames: true,
});
