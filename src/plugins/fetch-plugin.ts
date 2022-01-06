import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			// Handle root entry file of 'index.js'
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			// Handle common caching logic
			build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				if (cachedResult) {
					return cachedResult;
				}

				return null;
			});

			// Handle loading CSS files
			build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
				const { data, request } = await axios.get(args.path);
				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");
				const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				await fileCache.setItem(args.path, result);

				return result;
			});

			// Handle loading JSX
			build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
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
