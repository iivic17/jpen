import './preview.css';
import { useRef, useEffect } from 'react';
import PreviewProps from './preview-props';
import { rootHtml } from '../template';

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = rootHtml;

		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

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
