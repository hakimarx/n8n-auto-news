import React, { useEffect, useState } from 'react';
import { Newspaper, Send, Clock, User, Tag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsArticle {
    id: number;
    title: string;
    content: string;
    author: string;
    image: string;
    category: string;
    date: string;
}

function App() {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
        const interval = setInterval(fetchNews, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/news');
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Newspaper className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">AI NEWS <span className="text-blue-500">PORTAL</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                    <a href="#" className="hover:text-white transition-colors">Latest</a>
                    <a href="#" className="hover:text-white transition-colors">Technology</a>
                    <a href="#" className="hover:text-white transition-colors">Business</a>
                    <a href="#" className="hover:text-white transition-colors">Politics</a>
                </div>
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold transition-all">
                    Subscribe
                </button>
            </nav>

            {/* Hero Section */}
            <header className="container pt-16 pb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
                        Automated Journalism <br /> Powered by AI
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                        Real-time news generated from WhatsApp sources, processed by n8n,
                        and narrated by advanced AI models.
                    </p>
                </motion.div>
            </header>

            {/* News Feed */}
            <main className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="text-blue-500" size={24} />
                        Recent Updates
                    </h2>
                    <div className="h-px flex-1 bg-slate-800 mx-6 hidden md:block"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="news-grid">
                        <AnimatePresence mode='popLayout'>
                            {news.map((article, index) => (
                                <motion.article
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="glass-card overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <User size={14} /> {article.author}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} /> {new Date(article.date).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 hover:text-blue-400 transition-colors cursor-pointer">
                                            {article.title}
                                        </h3>

                                        <p className="text-slate-400 text-sm line-clamp-3 mb-6">
                                            {article.content}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                                            <button className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                                Read More <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>

                        {news.length === 0 && (
                            <div className="col-span-full py-20 text-center glass-card">
                                <p className="text-slate-500">No news articles yet. Send a message to your WhatsApp group to start!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="container mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>&copy; 2026 AI News Automation System. Built with n8n & React.</p>
            </footer>
        </div>
    );
}

export default App;
