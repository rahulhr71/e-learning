const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


app.post('/download', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

 
  const filename = `video_${Date.now()}.mp4`;
  const filepath = path.resolve(__dirname, filename);

  const ytdlp = spawn('yt-dlp', ['-f', 'mp4', '-o', filepath, url]);

  ytdlp.stdout.on('data', (data) => {
    console.log(`yt-dlp stdout: ${data}`);
  });

  ytdlp.stderr.on('data', (data) => {
    console.error(`yt-dlp stderr: ${data}`);
  });

  ytdlp.on('close', (code) => {
    if (code === 0) {

      res.download(filepath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).send('Error sending file');
        }
       
        fs.unlink(filepath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    } else {
      res.status(500).json({ error: 'Failed to download video' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
