import * as esbuild from 'esbuild-wasm';
import { loadPlugin } from '../plugins/load';
import { resolvePlugin } from '../plugins/resolve';

let service: esbuild.Service;

const bundler = async (rawCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	}

	const result = await service.build({
		entryPoints: ['index.js'],
		bundle: true,
		write: false,
		plugins: [resolvePlugin(), loadPlugin(rawCode)],
		define: {
			'process.env.NODE_ENV': '"production"',
			global: 'window',
		},
	});

	return result.outputFiles[0].text;
};

export default bundler;