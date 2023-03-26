const esbuild = require('esbuild');
const polyfill = require('esbuild-plugin-polyfill-node');

const replaceNodeBuiltIns = () => {
    const replace = {
        "process": require.resolve('process/browser'),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url/"),
        "util": require.resolve("util/"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "querystring": require.resolve("querystring-es3"),
        "zlib": require.resolve("browserify-zlib"),
        "assert": require.resolve("assert/"),
        "https": require.resolve("https-browserify"),
        "console": require.resolve('console-browserify'),
        "fs": require.resolve('./polyfills/empty.js'),
        "net": require.resolve('./polyfills/empty.js'),
        "crypto": require.resolve('./polyfills/empty.js'),
        'Buffer': require.resolve('buffer')
    }
    const filter = RegExp(`^(${Object.keys(replace).join("|")})$`);
    return {
        name: "replaceNodeBuiltIns",
        setup(build) {
            build.onResolve({ filter }, arg => ({
                path: replace[arg.path],
            }));
        },
    };
}

esbuild.build({
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'out.js',
    platform: 'browser',
    mainFields: ['browser', 'module', 'main'],
    external: ['vscode'],
    sourcemap: true,
    minify: false,
    keepNames: true,
    plugins: [
        // polyfill.polyfillNode(),
        replaceNodeBuiltIns(),
    ]
});


