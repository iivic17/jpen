import { Reducer } from 'redux';
import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
    [key: string]: {
        loading: boolean;
        code: string;
        err: string;
    }
}

const initialState: BundlesState = {};

const reducer: Reducer<BundlesState, Action> = produce((state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
        case ActionType.BUNDLE_START:
            return state;
        case ActionType.BUNDLE_COMPLETE:
            return state;
        default:
            return state;
    }
});