import './app.css';
import CodeCell from '../code-cell/code-cell';
import TextEditor from '../text-editor/text-editor';
import { Provider } from 'react-redux';
import { store } from './../../state';

const App: React.FC = () => {
	const initialCode = `
		import 'bulma/css/bulma.css';
		import React, { useState } from 'react';
		import ReactDOM from 'react-dom';

		const App = () => {
	    	const [counter, setCounter] = useState(0);

	    	const onClick = () => {
	        	setCounter(counter + 1);
	    	};

	    	return (
	        	<div>
	            	<h1 style={{fontSize: '36px'}}>Hello there</h1>
	            	<p>This is a React app!</p>
	            	<button onClick={onClick}>Increase me ({counter})</button>
	        	</div>
	   		);
		};

		ReactDOM.render(<App />, document.querySelector('#root'));
	`;

	return (
		<Provider store={store}>
			<div>
				<TextEditor />
				<CodeCell initialValue={initialCode} />
				{/* <CodeCell initialValue='' /> */}
			</div>
		</Provider>
	);
};

export default App;
