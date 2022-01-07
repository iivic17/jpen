export const rootHtml = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script type="module">
                    window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
                        throw err;
                    }
                }, false);
            </script>
        </body>
    </html>
`;

export const initialCode = `   
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
