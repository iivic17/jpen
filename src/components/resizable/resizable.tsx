import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import ResizableProps from './resizable-props';

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableBoxProps: ResizableBoxProps;

	switch (direction) {
		case 'horizontal':
			resizableBoxProps = {
				className: 'resize-horizontal',
				height: Infinity,
				width: window.innerWidth * 0.75,
				resizeHandles: ['e'],
				maxConstraints: [window.innerWidth * 0.75, Infinity],
				minConstraints: [window.innerWidth * 0.2, Infinity],
			};
			break;
		case 'vertical':
			resizableBoxProps = {
				height: 300,
				width: Infinity,
				resizeHandles: ['s'],
				maxConstraints: [Infinity, window.innerHeight * 0.9],
				minConstraints: [Infinity, 24],
			};
			break;
	}

	return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
