import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaJs, FaHtml5, FaCss3Alt, FaFileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
        case 'js':
        case 'jsx':
            return <FaJs className="inline-block mr-2" />;
        case 'html':
            return <FaHtml5 className="inline-block mr-2" />;
        case 'css':
            return <FaCss3Alt className="inline-block mr-2" />;
        default:
            return <FaFileAlt className="inline-block mr-2" />;
    }
};

const getLanguage = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
        case 'js':
        case 'jsx':
            return 'javascript';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        default:
            return 'text';
    }
};

const FileExplorer = ({ files, selectedFile, onFileSelect }) => {
    const [typingContent, setTypingContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasTyped, setHasTyped] = useState({});

    useEffect(() => {
        if (selectedFile && files[selectedFile] && !hasTyped[selectedFile]) {
            setTypingContent(''); // Reset the content
            setIsTyping(true);

            const content = files[selectedFile];
            let index = 0;

            const typingInterval = setInterval(() => {
                if (index < content.length) {
                    setTypingContent((prev) => prev + content[index]);
                    index++;
                } else {
                    setIsTyping(false);
                    setHasTyped((prev) => ({ ...prev, [selectedFile]: true }));
                    clearInterval(typingInterval);
                }
            }, 10);

            return () => clearInterval(typingInterval); // Cleanup on unmount or file change
        }
    }, [selectedFile, files, hasTyped]);

    return (
        <div className="flex h-screen overflow-auto">
            <div className="bg-editor-black text-gray-300 w-64 p-4 overflow-y-auto border-r border-border-color font-mono">
                <h2 className="text-lg font-medium mb-4 text-white border-b border-border-color">Files</h2>
                <ul>
                    {Object.keys(files).map((file) => (
                        <li
                            key={file}
                            className={`cursor-pointer ${
                                file === selectedFile ? 'bg-gray-300 rounded-sm text-blue-accent p-1' : 'p-1'
                            }`}
                            onClick={() => onFileSelect(file)}
                        >
                            {getFileIcon(file)} {file}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 bg-editor-black w-screen overflow-y-auto font-mono">
                {selectedFile ? (
                    <SyntaxHighlighter
                        language={getLanguage(selectedFile)}
                        style={vscDarkPlus}
                        showLineNumbers
                        wrapLines
                    >
                        {isTyping ? typingContent : files[selectedFile]}
                    </SyntaxHighlighter>
                ) : (
                    <pre className="text-gray-400 font-mono">
                        Select a file to view its content.
                    </pre>
                )}
            </div>
        </div>
    );
};

FileExplorer.propTypes = {
    files: PropTypes.object.isRequired,
    selectedFile: PropTypes.string,
    onFileSelect: PropTypes.func.isRequired,
};

export default FileExplorer;
