import './resizable.css';
import { ResizableBox } from 'react-resizable';
import ResizableProps from './resizable-props';

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	return (
		<ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
