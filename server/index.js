import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWS_FILE = path.join(__dirname, 'news.json');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Ensure news.json exists
if (!fs.existsSync(NEWS_FILE)) {
    fs.writeJsonSync(NEWS_FILE, []);
}

// Get all news
app.get('/api/news', async (req, res) => {
    try {
        const news = await fs.readJson(NEWS_FILE);
        res.json(news.reverse()); // Newest first
    } catch (err) {
        res.status(500).json({ error: 'Failed to read news' });
    }
});

// Post new news (Called by n8n)
app.post('/api/news', async (req, res) => {
    try {
        const { title, content, author, image, category } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const news = await fs.readJson(NEWS_FILE);
        const newArticle = {
            id: Date.now(),
            title,
            content,
            author: author || 'AI Reporter',
            image: image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000',
            category: category || 'General',
            date: new Date().toISOString()
        };

        news.push(newArticle);
        await fs.writeJson(NEWS_FILE, news);

        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save news' });
    }
});

app.listen(PORT, () => {
    console.log(`News API running at http://localhost:${PORT}`);
});
