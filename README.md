# Traycer Lite Browser Extension

A browser extension that converts high-level project ideas into structured software plans using two modes:
- **Mode 1**: Offline rule-based planning
- **Mode 2**: AI-powered planning with Gemini API

## Features

- 🚀 Quick project planning from any idea
- 📋 Structured output (Frontend, Backend, Database)
- 🤖 Two planning modes: Rule-based and AI-powered
- 📝 Human-readable explanations (Mode 2)
- 📋 Copy/Export functionality (JSON/Markdown)
- 🎨 Clean, responsive UI

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Gemini API key in `.env`
4. Build the extension: `npm run build`
5. Load the `dist` folder as an unpacked extension in Chrome

## Development

```bash
# Install dependencies
npm install

# Development build with watch
npm run dev

# Production build
npm run build

# Clean build directory
npm run clean
```

## Architecture

- **MVC Pattern**: Models, Views, Controllers for maintainability
- **React + TypeScript**: Modern UI development
- **Background Script**: Handles planning logic and API calls
- **Popup UI**: User interface for input and results

## API Setup

For Mode 2 (AI-powered planning), you'll need a Gemini API key:
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file
3. The extension will use it for AI-powered planning

## Usage

1. Click the extension icon
2. Enter your project idea
3. Choose planning mode (Rule-based or AI-powered)
4. Click "Generate Plan"
5. Copy results in JSON or Markdown format

## Extending

The architecture supports easy extension:
- Add new keyword mappings in `mode1Planner.ts`
- Enhance AI prompts in `mode2Planner.ts`
- Add new UI components following the MVC pattern
- Implement additional export formats
