import { useState } from 'react';
import { initialCode } from './template';
import bundle from '../bundler';
import CodeEditor from './code-editor/code-editor';
import Preview from './preview/preview';

const App: React.FC = () => {
	const [input, setInput] = useState(initialCode);
	const [code, setCode] = useState(input);

	const onClick = async () => {
		const output = await bundle(input);
		setCode(output);
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

export default App;
