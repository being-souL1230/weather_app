# AeroForecast - Weather Application

A modern weather application built with React, TypeScript, Express.js, and PostgreSQL.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Radix UI components + Tailwind CSS
- **State Management**: TanStack Query (React Query)

## Deployment to Render

### 1. Connect to Render

1. Go to [render.com](https://render.com) and create an account
2. Connect your GitHub account to Render
3. Select your AeroForecast repository

### 2. Deploy Web Service

1. Click **"New"** → **"Web Service"**
2. Select your repository
3. Configure the service:
   - **Name**: `aeroforecast
   - **Runtime**: `Node.js`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Branch**: `main`

### 3. Environment Variables

Add these environment variables in the Render dashboard:

```
NODE_ENV=production
PORT=10000
```

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy your application
3. Your app will be available at: `https://your-app-name.onrender.com`

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- Clean weather data visualization
- Light/dark theme support
- Responsive design (mobile/tablet/desktop)
- Location search with autocomplete
- Favorite locations management
- Weather comparison between locations
- Hourly and daily forecasts
- Geolocation support

## Project Structure

- `/client/` - React frontend application
- `/server/` - Express backend with TypeScript
- `/shared/` - Shared schemas and types

## Database Setup

The application uses PostgreSQL with Drizzle ORM. Make sure to set up your database connection string in production.

## Design Guidelines

The design follows Apple Weather and Weather.com inspiration with:
- Clean, modern interface
- Intuitive navigation
- Responsive layouts
- Accessible design patterns
