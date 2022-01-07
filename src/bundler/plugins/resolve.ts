import * as esbuild from 'esbuild-wasm';

export const resolvePlugin = () => {
	return {
		name: 'resolve-plugin',
		setup(build: esbuild.PluginBuild) {
			// Handle root entry file of 'index.js'
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return {
					namespace: 'a',
					path: 'index.js',
				};
			});

			// Handle relative paths in a module
			build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
				return {
					namespace: 'a',
					path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
				};
			});

			// Handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				};
			});
		},
	};
};
