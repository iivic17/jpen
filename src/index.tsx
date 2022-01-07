import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { unpkgPathPlugin } from './plugins/resolve';
import { fetchPlugin } from './plugins/load';
import CodeEditor from './components/code-editor/code-editor';
import Preview from './components/preview/preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { initialCode } from './components/template';

const App = () => {
	const ref = useRef<esbuild.Service>();
	const [input, setInput] = useState(initialCode);
	const [code, setCode] = useState(input);

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		}

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		setCode(result.outputFiles[0].text);
	};

	return (
		<div>
			<CodeEditor initialValue={input} onChange={value => setInput(value)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
