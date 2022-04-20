import './resizable.css';
import { useState, useEffect } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import ResizableProps from './resizable-props';

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableBoxProps: ResizableBoxProps;
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.75);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				if (width > window.innerWidth * 0.75) {
					setWidth(window.innerWidth * 0.75);
				}

				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
			}, 150);
		};

		window.addEventListener('resize', listener);

		return () => {
			window.removeEventListener('resize', listener);
		};
	}, [width]);

	switch (direction) {
		case 'horizontal':
			resizableBoxProps = {
				className: 'resize-horizontal',
				height: Infinity,
				width,
				resizeHandles: ['e'],
				maxConstraints: [innerWidth * 0.75, Infinity],
				minConstraints: [innerWidth * 0.2, Infinity],
				onResizeStop: (event, data) => {
					setWidth(data.size.width);
				},
			};
			break;
		case 'vertical':
			resizableBoxProps = {
				height: 300,
				width: Infinity,
				resizeHandles: ['s'],
				maxConstraints: [Infinity, innerHeight * 0.9],
				minConstraints: [Infinity, 24],
			};
			break;
	}

	return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
