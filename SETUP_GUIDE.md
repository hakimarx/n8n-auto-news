# 📰 AI News Automation Setup Guide

This guide will help you connect your WhatsApp group to your new AI News Portal.

## 1. Start the System
Run the `start-system.ps1` script in the project root. This will:
- Start **n8n** at `http://localhost:5678`
- Start **Evolution API** at `http://localhost:8080`
- Start your **News Portal** at `http://localhost:5173`
- Start the **News API** at `http://localhost:3001`

## 2. Connect WhatsApp (Evolution API)
1. Open n8n (`http://localhost:5678`).
2. Create a new workflow.
3. Add an **HTTP Request** node to create a WhatsApp instance in Evolution API:
   - **Method:** POST
   - **URL:** `http://localhost:8080/instance/create`
   - **Headers:** `apikey: 429683C4-C791-4383-9959-5D14405F6681`
   - **Body:** `{"instanceName": "news-bot"}`
4. Scan the QR code returned in the response using your WhatsApp (Linked Devices).

## 3. n8n Workflow Logic
Your workflow should follow this path:
1. **Webhook (from Evolution API):** Receives WhatsApp messages.
2. **AI Node (Gemini/OpenAI):** 
   - **Prompt:** "You are a professional journalist. Based on this WhatsApp message (text/image description), write a compelling news article with a title, category, and content. Return it in JSON format."
3. **HTTP Request (to News Portal):**
   - **Method:** POST
   - **URL:** `http://localhost:3001/api/news`
   - **Body:** The JSON output from the AI node.

## 4. Free AI API
I recommend using the **Google Gemini API** (Free Tier):
1. Get a key at [aistudio.google.com](https://aistudio.google.com/).
2. In n8n, use the **Google Gemini** node to process the news.

## 5. Admin Access
You are the admin of the portal. Any message sent to the connected WhatsApp (or specific group) will be processed and posted automatically.
