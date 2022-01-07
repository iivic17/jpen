import './app.css';
import CodeCell from '../code-cell/code-cell';

const App: React.FC = () => {
	const initialCode = `   
    	import React, { useState } from 'react';
    	import ReactDOM from 'react-dom';

    	const App = () => {
        	const [counter, setCounter] = useState(0);

        	const onClick = () => {
            	setCounter(counter + 1);
        	};

        	return (
            	<div>
                	<h1>Hello there</h1>
                	<p>This is a React app!</p>
                	<button onClick={onClick}>Increase me ({counter})</button>
            	</div>
       		);
    	};

   		ReactDOM.render(<App />, document.querySelector('#root'));
	`;

	return (
		<div>
			<CodeCell initialValue={initialCode} />
			{/* <CodeCell initialValue='' /> */}
		</div>
	);
};

export default App;
