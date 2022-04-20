import './app.css';
import { Provider } from 'react-redux';
import { store } from './../../state';
import CellList from '../cell-list/cell-list';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};

export default App;
