import { useState } from 'react';
import './index.css'; 
import FileExplorer from './FileExplorer';

const App = () => {
  const [files, setFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState('index.html');

  const [input, setInput] = useState('');

  const sendInput = async () => {
    try {
      const response = await fetch('http://localhost:5000/process-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      const data = await response.json();
      setFiles(data.files); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendInput();
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-screen bg-black p-5 flex">
        <div className="w-1/2 mr-4 pr-4 border-r border-border-color">
          <h1 className="text-6xl mb-4 font-extrabold">Rivix<span className='text-yellow-300  '>.</span></h1>
          <h2 className="text-lg mb-4 font-semibold">Generate code from a prompt</h2>
          <textarea
            className="w-full h-28 p-2 mb-2 rounded-lg border border-border-color bg-editor-black text-white text-sm resize-none focus:border-none"
            placeholder="Enter your prompt here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
          >
            
          </textarea>
          <button
            className="px-4 py-2 rounded bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold"
            onClick={sendInput}
          >
            Generate Code
          </button>
        </div>
        <div className="w-3/4 flex flex-col m-2 border bg-editor-black border-border-color rounded-lg p-1">
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
