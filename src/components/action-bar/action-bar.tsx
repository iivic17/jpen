import { useActions } from '../../hooks/use-actions';
import { ActionBarProps } from './action-bar-props';
import { Directions } from '../../state/direction';
import './action-bar.css';

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<div className='action-bar'>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(id, Directions.UP)}>
				<span className='icon'>
					<i className='fas fa-arrow-up'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(id, Directions.DOWN)}>
				<span className='icon'>
					<i className='fas fa-arrow-down'></i>
				</span>
			</button>
			<button className='button is-primary is-small' onClick={() => deleteCell(id)}>
				<span className='icon'>
					<i className='fas fa-times'></i>
				</span>
			</button>
		</div>
	);
};

export default ActionBar;
