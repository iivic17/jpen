import { useState } from 'react';
import bundle from '../../bundler';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import CodeCellProps from './code-cell-props';
import Resizable from '../resizable/resizable';

const CodeCell: React.FC<CodeCellProps> = ({ initialValue }) => {
	const [input, setInput] = useState(initialValue);
	const [code, setCode] = useState(input);

	const onClick = async () => {
		const output = await bundle(input);
		setCode(output);
	};

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={input}
						onChange={value => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
