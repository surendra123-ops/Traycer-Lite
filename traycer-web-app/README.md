# Traycer Lite Web Application

A full-stack web application version of the Traycer Lite browser extension.

## 🚀 Quick Deploy to Render

### Prerequisites
- MongoDB Atlas account (free tier available)
- Google Gemini API key (optional, for AI features)

### Deploy Steps

1. **Fork/Clone this repository**

2. **Set up MongoDB Atlas:**
   - Create a free MongoDB Atlas cluster
   - Get your connection string
   - Add it to Render environment variables as `MONGODB_URI`

3. **Deploy to Render:**
   - Connect your GitHub repository to Render
   - Create a new Web Service
   - Use these settings:
     - **Build Command:** `npm run install:all && npm run build`
     - **Start Command:** `npm start`
     - **Environment:** Node.js

4. **Set Environment Variables in Render:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/traycer
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=production
   FRONTEND_URL=https://your-app-name.onrender.com
   ```

5. **Deploy!** Render will automatically build and deploy your app.

## 🛠️ Local Development

```bash
# Install all dependencies
npm run install:all

# Start development servers
npm run dev

# Access the app
# Frontend: http://localhost:3001
# Backend: http://localhost:3000
```

## 📁 Project Structure

- `backend/` - Express.js API server with MongoDB
- `frontend/` - React web application
- `shared/` - Shared TypeScript types

## ✨ Features

- ✅ Same functionality as browser extension
- ✅ Rule-based and AI-powered planning
- ✅ Save plans to MongoDB
- ✅ View saved plans history
- ✅ Responsive web interface
- ✅ TypeScript throughout
```

## 🎯 Summary

I've created a complete web application that:

1. **Mirrors your extension's functionality** - Same planning modes and features
2. **Uses TypeScript throughout** - Backend and frontend
3. **MongoDB integration** - For saving and retrieving plans
4. **Easy Render deployment** - No YAML files needed
5. **Separate folder structure** - Won't interfere with your extension

**To deploy:**
1. Create the `traycer-web-app` folder with all these files
2. Set up MongoDB Atlas (free)
3. Connect to Render and deploy
4. Set environment variables in Render dashboard

The web app will have the same features as your extension but accessible through any web browser!
