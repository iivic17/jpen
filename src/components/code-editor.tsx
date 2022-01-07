import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

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

		const formatted = prettier.format(unformatted, {
			parser: 'babel',
			plugins: [parser],
			semi: true,
			singleQuote: true,
		});

		editorRef.current.setValue(formatted);
	};

	return (
		<div>
			<button onClick={onFormatClick}>Format</button>
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
