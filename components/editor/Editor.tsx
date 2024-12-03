"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Minus, Plus } from 'lucide-react';
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from '@liveblocks/react';
import { Awareness } from "y-protocols/awareness";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Cursors } from "./Cursors";

interface EditorProps {
  roomId: string;
  currentUserType: string;
}

const Editor = ({ roomId, currentUserType }: EditorProps) => {
    const [language, setLanguage] = useState('javascript');
    const [fontSize, setFontSize] = useState(14);
    const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();

    const room = useRoom();
    const userInfo = useSelf((me) => me.info);

    useEffect(() => {
        let yDoc: Y.Doc;
        let yProvider: LiveblocksYjsProvider;
        let binding: MonacoBinding;

        if (editorRef && room && userInfo) {
            yDoc = new Y.Doc();
            const yText = yDoc.getText("monaco");
            yProvider = new LiveblocksYjsProvider(room, yDoc);
            
            setProvider(yProvider);

            yProvider.awareness.setLocalStateField('user', {
                name: userInfo.name,
                color: userInfo.color,
                colorLight: userInfo.color + "80",
                type: currentUserType
            });

            binding = new MonacoBinding(
                yText,
                editorRef.getModel() as editor.ITextModel,
                new Set([editorRef]),
                yProvider.awareness as unknown as Awareness
            );
        }

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
            binding?.destroy();
        };
    }, [editorRef, room, userInfo, currentUserType]);

    const handleEditorMount = useCallback((editor: editor.IStandaloneCodeEditor) => {
        setEditorRef(editor);
    }, []);

    const increaseFontSize = () => {
        setFontSize(prev => Math.min(prev + 2, 24));
    };

    const decreaseFontSize = () => {
        setFontSize(prev => Math.max(prev - 2, 10));
    };

    return (
        <div className='w-full'>
        {provider && <Cursors yProvider={provider} />}
            <div className="p-4">
                <div className="flex justify-between">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center">
                            <label className="mr-2">Select Language:</label>
                            <Select
                                value={language}
                                onValueChange={setLanguage}
                            >
                                <SelectTrigger className="border-2 border-sky-500 w-[150px]">
                                    <SelectValue placeholder="javascript" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
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

                <div className="editor-container h-[80vh]">
                    <MonacoEditor
                        height="100%"
                        width="100%"
                        theme="vs-dark"
                        language={language}
                        defaultValue="// Start coding here..."
                        onMount={handleEditorMount}
                        options={{
                            fontSize: fontSize,
                            tabSize: 2,
                            padding: { top: 20 },
                            minimap: { enabled: true },
                            automaticLayout: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Editor;
