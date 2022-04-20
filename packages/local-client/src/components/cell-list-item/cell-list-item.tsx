import { CellListItemProps } from './cell-list-item-props';
import { CellTypes } from '../../state';
import CodeCell from '../code-cell/code-cell';
import TextEditor from '../text-editor/text-editor';
import ActionBar from '../action-bar/action-bar';
import './cell-list-item.css';

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let child: JSX.Element;

	if (cell.type === CellTypes.CODE) {
		child = (
			<>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<CodeCell cell={cell} />
			</>
		);
	} else {
		child = (
			<>
				<TextEditor cell={cell} />
				<ActionBar id={cell.id} />
			</>
		);
	}

	return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
