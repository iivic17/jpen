import { useEffect } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import CodeCellProps from './code-cell-props';
import Resizable from '../resizable/resizable';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector(state => state.bundles[cell.id]);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		timer = setTimeout(async () => {
			createBundle(cell.id, cell.content);
		}, 750);

		return () => {
			clearTimeout(timer);
		};
	}, [cell.content, cell.id]);

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={value => updateCell(cell.id, value)}
					/>
				</Resizable>
				{bundle && <Preview code={bundle.code} err={bundle.err} />}
			</div>
		</Resizable>
	);
};

export default CodeCell;
