import './code-editor.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import CodeEditorProps from './code-editor-props';

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

		editorRef.current = monacoEditor;

		onFormatClick();
	};

	const onFormatClick = () => {
		if (!editorRef.current) {
			return;
		}

		const unformatted = editorRef.current.getModel()?.getValue();

		if (!unformatted) {
			return;
		}

		const formatted = prettier
			.format(unformatted, {
				parser: 'babel',
				plugins: [parser],
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');

		editorRef.current.setValue(formatted);
	};

	return (
		<div className='editor-wrapper'>
			<button
				onClick={onFormatClick}
				className='button button-format is-primary is-small'>
				Format
			</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				height='500px'
				language='javascript'
				theme='dark'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					smoothScrolling: true,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
