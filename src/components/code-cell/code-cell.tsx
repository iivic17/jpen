import { useState, useEffect } from 'react';
import bundle from '../../bundler';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import CodeCellProps from './code-cell-props';
import Resizable from '../resizable/resizable';

const CodeCell: React.FC<CodeCellProps> = ({ initialValue }) => {
	const [input, setInput] = useState(initialValue);
	const [err, setErr] = useState('');
	const [code, setCode] = useState(input);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		timer = setTimeout(async () => {
			const output = await bundle(input);
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={input}
						onChange={value => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
