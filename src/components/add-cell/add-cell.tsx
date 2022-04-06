import { AddCellProps } from './add-cell-props';
import { useActions } from '../../hooks/use-actions';
import { CellTypes } from '../../state';
import './add-cell.css';

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
	const { insertCellBefore } = useActions();

	return (
		<div>
			<button onClick={() => insertCellBefore(nextCellId, CellTypes.CODE)}>
				Code
			</button>
			<button onClick={() => insertCellBefore(nextCellId, CellTypes.TEXT)}>
				Text
			</button>
		</div>
	);
};

export default AddCell;
