const express = require("express");
const cors = require("cors");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());

const ytdlpPath = path.join(__dirname, "yt-dlp.exe");

// Check yt-dlp
if (!fs.existsSync(ytdlpPath)) {
    console.error("❌ yt-dlp.exe not found at:", ytdlpPath);
    process.exit(1);
}

// Check FFmpeg
const checkFFmpeg = () =>
    new Promise((resolve) => {
        const ffmpeg = spawn("ffmpeg", ["-version"]);
        ffmpeg.on("error", () => resolve(false));
        ffmpeg.on("close", (code) => resolve(code === 0));
    });

// Get video info
app.get("/info", (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send("URL is required");

    try {
        const ytdlp = spawn(ytdlpPath, [
            "-f", `${format}+bestaudio/best`, // video+audio
            "--merge-output-format", "mp4",   // merge into mp4
            "-o", "-",                        // output to stdout
            url
        ]);
        ytdlp.stdout.pipe(res);

        let data = "";

        ytdlp.stdout.on("data", (chunk) => (data += chunk.toString()));
        ytdlp.stderr.on("data", (err) => console.error("yt-dlp error:", err.toString()));

        ytdlp.on("close", () => {
            try {
                const info = JSON.parse(data);

                const formats = info.formats.map((f) => ({
                    format_id: f.format_id,
                    resolution: f.height ? `${f.height}p` : "audio",
                    ext: f.ext,
                    filesize: f.filesize || null,
                }));

                res.json({
                    title: info.title,
                    thumbnail: info.thumbnail,
                    duration: info.duration,
                    formats,
                });
            } catch (err) {
                console.error("JSON parse error:", err);
                res.status(500).send("Failed to fetch video info");
            }
        });
    } catch (err) {
        console.error("yt-dlp spawn error:", err);
        res.status(500).send("yt-dlp not found or failed to run");
    }
});

// Download video + audio merged
app.get("/download", async (req, res) => {
    const { url, format } = req.query;
    if (!url || !format) return res.status(400).send("Missing url or format");

    const filename = `video_${Date.now()}.mp4`;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "video/mp4");

    const ffmpegAvailable = await checkFFmpeg();

    const ytdlpArgs = ffmpegAvailable
        ? ["-f", `${format}+bestaudio/best`, "--merge-output-format", "mp4", "-o", "-", url]
        : ["-f", format, "-o", "-", url]; // fallback: video only

    const ytdlp = spawn(ytdlpPath, ytdlpArgs);

    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on("data", (data) => console.error("yt-dlp error:", data.toString()));

    ytdlp.on("close", (code) => console.log(`yt-dlp finished with code ${code}`));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
