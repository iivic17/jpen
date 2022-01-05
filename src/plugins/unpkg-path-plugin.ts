import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
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

			build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode,
					};
				}

				const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

				if (cacheResult) {
					return cacheResult;
				}

				const { data, request } = await axios.get(args.path);

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				await fileCache.setItem(args.path, result);

				return result;
			});
		},
	};
};
