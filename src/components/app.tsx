import CodeCell from './code-cell/code-cell';
import { initialCode } from './template';

const App: React.FC = () => {
	return (
		<div>
			<CodeCell initialValue={initialCode} />
			{/* <CodeCell initialValue='' /> */}
		</div>
	);
};

export default App;
