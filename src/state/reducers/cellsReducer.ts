import produce from 'immer';
import { Cell } from './../cell';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const reducer = produce(
	(action: Action, state: CellsState = initialState): CellsState | void => {
		switch (action.type) {
			case ActionType.MOVE_CELL:
				// TODO
				return state;

			case ActionType.DELETE_CELL:
				// TODO
				return state;

			case ActionType.INSERT_CELL_BEFORE:
				// TODO
				return state;

			case ActionType.UPDATE_CELL:
				const { id, content } = action.payload;

				state.data[id].content = content;
				return;

			default:
				return state;
		}
	}
);

export default reducer;
