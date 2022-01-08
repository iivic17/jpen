import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import TextEditorProps from './text-editor-props';

const TextEditor: React.FC<TextEditorProps> = () => {
	const initialValue = `# Header 
- Item 1 
- Item 2 
- Item 3`;

	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={ref} className='text-editor'>
				<MDEditor
					value={value}
					onChange={v => {
						setValue(v || '');
					}}
				/>
			</div>
		);
	}

	return (
		<div
			className='text-editor card'
			onClick={() => {
				setEditing(true);
			}}>
			<div className='card-content'>
				<MDEditor.Markdown source={value} className='text-editor' />
			</div>
		</div>
	);
};

export default TextEditor;
