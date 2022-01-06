const placeholder = `import React, { useState } from 'react';
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

ReactDOM.render(<App />, document.querySelector('#root'));`;

export default placeholder;
