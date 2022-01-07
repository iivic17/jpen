import './preview.css';
import { useRef, useEffect } from 'react';
import PreviewProps from './preview-props';

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	const rootHtml = `
    	<html>
        	<head></head>
        	<body>
            	<div id="root"></div>
            	<script>
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

	useEffect(() => {
		iframe.current.srcdoc = rootHtml;

		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code, rootHtml]);

	return (
		<div className='preview-wrapper'>
			<iframe
				className='preview'
				ref={iframe}
				sandbox='allow-scripts'
				srcDoc={rootHtml}
				title='jpen'
			/>
		</div>
	);
};

export default Preview;
