# Traycer Lite Browser Extension

A powerful browser extension that transforms high-level project ideas into structured software development plans using two intelligent modes: rule-based keyword matching and AI-powered planning with Google's Gemini API.

## 🚀 Features

- **Dual Planning Modes**: Choose between fast rule-based planning or intelligent AI-powered analysis
- **Structured Output**: Organized plans with Frontend, Backend, and Database components
- **Smart Keyword Detection**: Pre-configured mappings for common project types (chat, ecommerce, social, gaming, AI/ML, analytics)
- **AI-Powered Insights**: Human-readable explanations and intelligent project breakdowns
- **Clean UI**: Modern, responsive interface built with React and TailwindCSS
- **Chrome Extension**: Native browser integration with Manifest V3
- **TypeScript**: Full type safety and modern development experience

## 🏗️ Architecture

### MVC Pattern Implementation
- **Models** (`src/popup/models/`): Data management and state handling
- **Views** (`src/popup/views/`): React components for UI presentation
- **Controllers** (`src/popup/controllers/`): Business logic and communication layer

### Core Components

#### Background Service Worker (`src/background/`)
- **`index.ts`**: Main message handler and orchestration
- **`mode1Planner.ts`**: Rule-based planning with keyword mappings
- **`mode2Planner.ts`**: AI-powered planning with Gemini API integration

#### Popup Interface (`src/popup/`)
- **`index.tsx`**: Main React application entry point
- **`InputForm.tsx`**: User input form with mode selection
- **`PlanView.tsx`**: Results display component
- **`planController.ts`**: Communication bridge to background script
- **`planModel.ts`**: Data model with history management

#### Type Definitions (`src/types/`)
- **`planTypes.ts`**: TypeScript interfaces for type safety

## 🛠️ Tech Stack

### Frontend Technologies
- **React 18.2.0** - Component-based UI framework
- **TypeScript 5.1.6** - Type-safe JavaScript development
- **TailwindCSS** - Utility-first CSS framework (via CDN)
- **React DOM 18.2.0** - React rendering engine

### Build System
- **Webpack 5.88.2** - Module bundler and build tool
- **TypeScript Loader 9.4.4** - TypeScript compilation
- **HTML Webpack Plugin 5.5.3** - HTML generation
- **Copy Webpack Plugin 11.0.0** - Asset copying
- **CSS/Style Loaders** - CSS processing and injection

### Browser Extension
- **Chrome Extension API** - Native browser integration
- **Manifest V3** - Latest extension manifest format
- **Service Worker** - Background script execution

### AI Integration
- **Google Gemini API** - AI-powered project planning
- **Fetch API** - HTTP communication with external services

### Development Tools
- **Rimraf 5.0.1** - Cross-platform file deletion
- **TypeScript Definitions** - Type safety for Chrome APIs and React

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Chrome browser for testing

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd traycer-lite-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key (Optional)**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   
   Or update the API key directly in `src/background/mode2Planner.ts`:
   ```typescript
   const GEMINI_API_KEY = 'your_actual_gemini_api_key_here';
   ```

4. **Build the extension**
   ```bash
   npm run build
   ```

5. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` folder

## 🚀 Development

### Available Scripts

```bash
# Install dependencies
npm install

# Development build with file watching
npm run dev

# Production build
npm run build

# Clean build directory
npm run clean
```

### Development Workflow

1. **Start development mode**
   ```bash
   npm run dev
   ```

2. **Make changes** to source files in `src/`

3. **Reload extension** in Chrome extensions page

4. **Test functionality** by clicking the extension icon

## 🎯 Usage Guide

### Basic Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Enter your project idea** in the text area
3. **Select planning mode**:
   - **Rule-based**: Fast, keyword-driven planning
   - **AI-powered**: Intelligent analysis with explanations
4. **Click "Generate Plan"** to create your structured plan
5. **Review the results** organized by Frontend, Backend, and Database

### Planning Modes

#### Mode 1: Rule-Based Planning
- **Speed**: Instant results
- **Method**: Keyword matching against predefined templates
- **Best for**: Common project types (chat, ecommerce, social, gaming, AI/ML, analytics)
- **Fallback**: Generic plan for unrecognized ideas

#### Mode 2: AI-Powered Planning
- **Speed**: 2-5 seconds (depends on API response)
- **Method**: Google Gemini API analysis
- **Best for**: Complex, unique, or novel project ideas
- **Features**: Human-readable explanations and intelligent breakdowns
- **Fallback**: Automatically falls back to rule-based if API fails

### Supported Project Types (Rule-Based)

The extension includes pre-configured templates for:

- **Chat/Messaging**: Real-time communication systems
- **E-commerce**: Online stores and shopping platforms
- **Social Networks**: Social media and community platforms
- **Gaming**: Game development and player management
- **AI/ML**: Machine learning and artificial intelligence projects
- **Analytics/Dashboard**: Data visualization and metrics platforms

## 🔧 Configuration

### API Key Setup

For AI-powered planning, you need a Google Gemini API key:

1. **Get API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Configure Extension**:
   - Update `GEMINI_API_KEY` in `src/background/mode2Planner.ts`
   - Or set environment variable `GEMINI_API_KEY`

3. **Test Configuration**:
   - Try AI mode with a test project idea
   - Check browser console for any API errors

### Extension Permissions

The extension requires these permissions (defined in `manifest.json`):

- **`storage`**: For saving user preferences and plan history
- **`activeTab`**: For potential future tab integration
- **`host_permissions`**: Access to Google Gemini API endpoints

## 🏗️ Project Structure

```
traycer-lite-extension/
├── public/
│   └── manifest.json          # Extension manifest
├── src/
│   ├── background/            # Service worker scripts
│   │   ├── index.ts          # Main message handler
│   │   ├── mode1Planner.ts   # Rule-based planning
│   │   └── mode2Planner.ts   # AI-powered planning
│   ├── popup/                # Extension popup UI
│   │   ├── controllers/      # MVC controllers
│   │   ├── models/          # MVC models
│   │   ├── views/           # React components
│   │   ├── index.tsx        # Main React app
│   │   └── popup.html       # HTML template
│   └── types/               # TypeScript definitions
│       └── planTypes.ts     # Core type definitions
├── dist/                    # Built extension (generated)
├── package.json            # Dependencies and scripts
├── webpack.config.js       # Build configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔌 Extending the Extension

### Adding New Project Types (Rule-Based)

1. **Edit `src/background/mode1Planner.ts`**
2. **Add new keyword mapping**:
   ```typescript
   {
     keywords: ['your', 'keywords', 'here'],
     plan: {
       Frontend: ['Frontend task 1', 'Frontend task 2'],
       Backend: ['Backend task 1', 'Backend task 2'],
       Database: ['Database entity 1', 'Database entity 2']
     }
   }
   ```

### Enhancing AI Prompts

1. **Edit `src/background/mode2Planner.ts`**
2. **Modify `createSmartPrompt()` function**
3. **Customize the prompt template** for different project types

### Adding New UI Components

1. **Create component** in `src/popup/views/`
2. **Follow MVC pattern**:
   - Add model logic in `src/popup/models/`
   - Add controller logic in `src/popup/controllers/`
3. **Import and use** in `src/popup/index.tsx`

### Adding Export Formats

1. **Extend `PlanView.tsx`** with export buttons
2. **Add export functions** in controller
3. **Implement format conversion** (JSON, Markdown, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **Extension not loading**:
   - Check `dist` folder exists and contains built files
   - Verify manifest.json is valid
   - Check browser console for errors

2. **AI mode not working**:
   - Verify API key is correctly set
   - Check network connectivity
   - Review browser console for API errors
   - Ensure API key has proper permissions

3. **Build errors**:
   - Run `npm run clean` then `npm run build`
   - Check TypeScript compilation errors
   - Verify all dependencies are installed

4. **UI not displaying**:
   - Check if TailwindCSS is loading
   - Verify React components are rendering
   - Check browser console for JavaScript errors

### Debug Mode

Enable debug logging by opening Chrome DevTools:
1. Right-click extension icon → "Inspect popup"
2. Check Console tab for error messages
3. Use Network tab to monitor API calls



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



---

**Traycer Lite** - Transform your ideas into structured development plans with the power of AI and intelligent rule-based planning.
```