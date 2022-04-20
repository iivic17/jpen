import { useTypedSelector } from './use-typed-selector';
import { CellTypes } from './../state/cell';

export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector(state => {
		const { data, order } = state.cells;

		const orderedCells = order.map(id => data[id]);

		const showFunc = `
			import _React from 'react';
			import _ReactDOM from 'react-dom';

			var show = (value) => {
				const root = document.querySelector('#root');
				let template;

				if (typeof value === 'object') {
					if (value.$$typeof && value.props) {
						template = <>{ value }</>;
					} else {
						template = <div>{ JSON.stringify(value) }</div>;
					}
				} else {
					template = <div>{ value }</div>;
				}

				_ReactDOM.render(template, root);
			};
		`;
		const showFuncNoop = `var show = () => {};`;
		const cumulativeCode = [];

		for (let c of orderedCells) {
			if (c.type === CellTypes.CODE) {
				if (c.id === cellId) {
					cumulativeCode.push(showFunc);
				} else {
					cumulativeCode.push(showFuncNoop);
				}
				cumulativeCode.push(c.content);
			}

			if (c.id === cellId) {
				break;
			}
		}

		return cumulativeCode;
	}).join('\n');
};
