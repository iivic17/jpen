import { AddCellProps } from './add-cell-props';
import { useActions } from '../../hooks/use-actions';
import { CellTypes } from '../../state';
import './add-cell.css';

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
	const { insertCellBefore } = useActions();

	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className='add-buttons'>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellBefore(nextCellId, CellTypes.CODE)}>
					<span className='icon is-small'>
						<i className='fas fa-plus'> </i>
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellBefore(nextCellId, CellTypes.TEXT)}>
					<span className='icon is-small'>
						<i className='fas fa-plus'> </i>
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className='divider' />
		</div>
	);
};

export default AddCell;
