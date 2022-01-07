import { useRef, useEffect } from 'react';
import PreviewProps from './preview-props';
import { rootHtml } from '../template';

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = rootHtml;

		iframe.current.contentWindow.postMessage(code, '*');
	}, [code]);

	return <iframe ref={iframe} sandbox='allow-scripts' srcDoc={rootHtml} title='jpen' />;
};

export default Preview;
