import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Action';

// Import all Codemirror themes upfront
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/midnight.css';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const [selectedTheme, setSelectedTheme] = useState('icecoder'); // Default theme
    const [lang, setLang] = useState('javascript'); // Default theme

    useEffect(() => {
        if (!socketRef.current) return;

        // Initialize or update CodeMirror instance
        function initOrUpdateEditor() {
            if (!editorRef.current) {
                editorRef.current = Codemirror.fromTextArea(
                    document.getElementById('realTimeEditor'),
                    {
                        mode: {
                            name: lang,
                            json: true,
                        },
                        theme: selectedTheme,
                        autoCloseTags: true,
                        autoCloseBrackets: true,
                        lineNumbers: true,
                    }
                );

                editorRef.current.on('change', (instance, change) => {
                    const code = instance.getValue();
                    onCodeChange(code);
                    if (change.origin !== 'setValue') {
                        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                            roomId,
                            code,
                        });
                    }
                });

                socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                    if (code !== editorRef.current.getValue()) {
                        editorRef.current.setValue(code);
                    }
                });
            } else {
                // Update existing instance with new theme
                editorRef.current.setOption('theme', selectedTheme);
            }
        }

        initOrUpdateEditor();

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            }
        };
    }, [socketRef.current, selectedTheme]);

    const handleThemeChange = (e) => {
        const theme = e.target.value;
        setSelectedTheme(theme);
    };

    const handleLangChange = (e) => {
        const language = e.target.value;
        setLang(language);
    };
    // console.log(lang);

    return (
        <div style={{ background: '#1D1D1B' }}>
            <div className="selectWrap">
                <select name="Language" id="lang" onChange={handleLangChange}>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">CPP</option>
                    <option value="c">C</option>
                </select>
                <select name="Theme" id="theme" onChange={handleThemeChange} value={selectedTheme}>
                    <option value="dracula">Dracula</option>
                    <option value="eclipse">Eclipse</option>
                    <option value="icecoder">IceCoder</option>
                    <option value="midnight">Midnight</option>
                </select>
            </div>
            <textarea id="realTimeEditor" rows={1} />
        </div>
    );
};

export default Editor;
