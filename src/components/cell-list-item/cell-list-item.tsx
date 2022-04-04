import { CellListItemProps } from './cell-list-item-props';
import { CellTypes } from '../../state';
import CodeCell from '../code-cell/code-cell';
import TextEditor from '../text-editor/text-editor';

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	let child: JSX.Element;

	if (cell.type === CellTypes.CODE) {
		child = <CodeCell cell={cell} />;
	} else {
		child = <TextEditor />;
	}

	return <div>{child}</div>;
};

export default CellListItem;
