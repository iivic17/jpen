import { useState, useEffect } from 'react';
import bundle from '../../bundler';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import CodeCellProps from './code-cell-props';
import Resizable from '../resizable/resizable';
import { useActions } from '../../hooks/use-actions';

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [err, setErr] = useState('');
	const [code, setCode] = useState('');
	const { updateCell } = useActions();

	useEffect(() => {
		let timer: NodeJS.Timeout;

		timer = setTimeout(async () => {
			const output = await bundle(cell.content);
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [cell.content]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={value => updateCell(cell.id, value)}
					/>
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
