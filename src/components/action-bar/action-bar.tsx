import { useActions } from '../../hooks/use-actions';
import { ActionBarProps } from './action-bar-props';
import { Directions } from '../../state/direction';

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions();

	return (
		<div>
			<button onClick={() => moveCell(id, Directions.UP)}>Up</button>
			<button onClick={() => moveCell(id, Directions.DOWN)}>Down</button>
			<button onClick={() => deleteCell(id)}>Delete</button>
		</div>
	);
};

export default ActionBar;
