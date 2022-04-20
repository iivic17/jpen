import './preview.css';
import { useRef, useEffect } from 'react';
import PreviewProps from './preview-props';

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
	const iframe = useRef<HTMLIFrameElement | null>(null);

	const rootHtml = `
    	<html>
        	<head>
				<style>
					.preview-err {
						position: absolute;
						top: 10px;
						left: 10px;
						color: red;
						font-size: 16px;
						font-weight: 400;
						line-height: 1;
					}
				</style>
			</head>
        	<body>
            	<div id="root"></div>
            	<script>
					const handleError = (err) => {
						const root = document.querySelector('#root');
                        root.innerHTML = '<div class="preview-err">' + err + '</div>';
                        console.log(err);
					};

					window.addEventListener('error', (event) => {
						event.preventDefault();
						handleError(event.error);
					});

                    window.addEventListener('message', (event) => {
                    	try {
                        	eval(event.data);
                    	} catch (err) {
							handleError(err);
                		}
					}, false);
            	</script>
        	</body>
    	</html>
	`;

	useEffect(() => {
		if (!iframe.current) {
			return;
		}

		iframe.current.srcdoc = rootHtml;

		setTimeout(() => {
			iframe.current?.contentWindow?.postMessage(code, '*');
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
			{err && <div className='preview-err'>{err}</div>}
		</div>
	);
};

export default Preview;
