const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/process-input', async (req, res) => {
  const { input } = req.body;

  try {
    const apiResponse = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2:3b',
        messages: [
          {
            role: 'system',
            content:
              "You are an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks and best practices. Generate code and Provide separate labeled code blocks for HTML, CSS, JavaScript, and associate them with filenames like 'index.html', 'styles.css', 'script.js'",
          },
          {
            role: 'user',
            content: input,
          },
        ],
        stream: false,
      }),
    });

    const data = await apiResponse.json();
    const response = data.message.content;

    // Parse the AI response to separate files
    const files = {};
    const blocks = response.match(/```(html|css|javascript|jsx)\n([\s\S]*?)```/g);
    if (blocks) {
      blocks.forEach((block) => {
        const [, language, code] = block.match(/```(html|css|javascript|jsx)\n([\s\S]*?)```/);
        let fileName;
        switch (language) {
          case 'html':
            fileName = 'index.html';
            break;
          case 'css':
            fileName = 'styles.css';
            break;
          case 'javascript':
            fileName = 'script.js';
            break;
          // case 'jsx':
          //   fileName = 'component.jsx';
          //   break;
        }
        files[fileName] = code;
      });
    }

    res.json({ files });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process input' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
