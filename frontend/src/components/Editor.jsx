import React, { useState, useCallback, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { markdown } from '@codemirror/lang-markdown';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { sql } from '@codemirror/lang-sql';
import { xml } from '@codemirror/lang-xml';
import { json } from '@codemirror/lang-json';
import { rust } from '@codemirror/lang-rust';
import { Minus, Plus } from 'lucide-react';
import { autocompletion } from "@codemirror/autocomplete"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

const Editor = () => {
    const [code, setCode] = useState('// Start coding here...');
    const [language, setLanguage] = useState('javascript');
    const [fontSize, setFontSize] = useState(14);
    const editorRef = useRef(null);

    const getLanguageExtension = (lang) => {
        switch (lang) {
            case 'javascript':
                return javascript();
            case 'python':
                return python();
            case 'html':
                return html();
            case 'css':
                return css();
                // case 'markdown':
                return markdown();
            case 'java':
                return java();
            case 'cpp':
                return cpp();
            case 'php':
                return php();
            case 'sql':
                return sql();
            case 'xml':
                return xml();
            case 'json':
                return json();
            case 'rust':
                return rust();
            default:
                return javascript();
        }
    };

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(prev + 2, 24));
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(prev - 2, 10));
    };

    // Update font size when it changes
    useEffect(() => {
        const editorElement = document.querySelector('.cm-editor');
        if (editorElement) {
            // Apply font size to editor content
            editorElement.style.fontSize = `${fontSize}px`;

            // Also update the gutter (line numbers)
            const gutterElement = editorElement.querySelector('.cm-gutters');
            if (gutterElement) {
                gutterElement.style.fontSize = `${fontSize}px`;
            }
        }
    }, [fontSize]);

    return (
        <div>
            <div className="p-4">
                <div className="flex justify-between">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center">
                            <label className="mr-2">Select Language:</label>
                            <Select
                                value={language}
                                onValueChange={setLanguage}
                                className="p-2 border rounded"
                            >
                                <SelectTrigger className="border-2 border-sky-500 w-[150px]">
                                    <SelectValue placeholder="javascript" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
                                    <SelectItem value="markdown">Markdown</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                    <SelectItem value="php">PHP</SelectItem>
                                    <SelectItem value="sql">SQL</SelectItem>
                                    <SelectItem value="xml">XML</SelectItem>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="rust">Rust</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="mr-2">Font Size:</label>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={decreaseFontSize}
                                className="h-8 w-8"
                                disabled={fontSize <= 10}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">{fontSize}px</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={increaseFontSize}
                                className="h-8 w-8"
                                disabled={fontSize >= 24}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button>Run</Button>
                    </div>
                </div>

                <div className="editor-container">
                    <CodeMirror
                        value={code}
                        height="80vh"
                        theme={oneDark}
                        extensions={[getLanguageExtension(language)]}
                        onChange={(value) => setCode(value)}
                        className="border rounded"
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLineGutter: true,
                            highlightSpecialChars: true,
                            history: true,
                            foldGutter: true,
                            drawSelection: true,
                            dropCursor: true,
                            allowMultipleSelections: true,
                            indentOnInput: true,
                            syntaxHighlighting: true,
                            bracketMatching: true,
                            closeBrackets: true,
                            autocompletion: true,
                            rectangularSelection: true,
                            crosshairCursor: true,
                            highlightActiveLine: true,
                            highlightSelectionMatches: true,
                            closeBracketsKeymap: true,
                            defaultKeymap: true,
                            searchKeymap: true,
                            historyKeymap: true,
                            foldKeymap: true,
                            completionKeymap: true,
                            lintKeymap: true,
                        }}
                    />
                </div>

                <style>{`
    .cm-editor {
        font-size: ${fontSize}px;
    }
    .cm-editor .cm-gutters {
        font-size: ${fontSize}px;
    }
    .cm-editor .cm-content {
        font-size: ${fontSize}px;
    }
`}</style>
            </div>
        </div>
    );
};

export default Editor;