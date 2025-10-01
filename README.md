# AeroForecast - Weather Application

A modern weather app that gives you real-time weather information with a beautiful interface!

---

## Features

- **Live Weather Data** - Current temperature, humidity, wind speed and more
- **Search Locations** - Check weather for any city instantly
- **Dark/Light Mode** - Choose your preferred theme
- **Favorites** - Save your favorite cities for quick access
- **Compare Weather** - Compare weather between two cities side-by-side
- **Hourly Forecast** - Detailed weather for the next 24 hours
- **7-Day Forecast** - Plan your entire week with weather predictions
- **Auto Location** - Automatically detect your location using GPS

---

## Technology Stack

### Frontend (What Users See)
- **React 18** - For building the user interface
- **TypeScript** - For better code quality and type safety
- **Vite** - Fast development server
- **Tailwind CSS** - For styling
- **Radix UI** - Beautiful pre-built components

### Backend (Server Side)
- **Express.js** - API server
- **TypeScript** - Type-safe backend code
- **PostgreSQL** - Database for storing favorites
- **Drizzle ORM** - Database management made easy

### Other Tools
- **TanStack Query** - Data fetching and caching
- **Weather API** - Real-time weather data

---

## Local Development (Running on Your Computer)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/aeroforecast.git
cd aeroforecast
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run in Development Mode
```bash
npm run dev
```

Now open your browser and go to `http://localhost:5000` to see the app!

### Other Useful Commands
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## How to Deploy on Render?

Render is a free hosting service where you can deploy your app easily.

### Step 1: Create a Render Account
1. Go to [render.com](https://render.com)
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### Step 2: Connect Your GitHub Repository
1. Go to your Render dashboard
2. Click the "New +" button
3. Select "Web Service"
4. Choose your GitHub repository

### Step 3: Configure the Service
Enter these settings:

**Basic Settings:**
- **Name:** `aeroforecast` (or any name you prefer)
- **Region:** Select the closest region (e.g., Singapore)
- **Branch:** `main`
- **Runtime:** `Node`

**Build Settings:**
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

**Instance Type:**
- **Free** (start with the free plan)

### Step 4: Add Environment Variables
In the "Environment" section, add these variables:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=your_postgres_connection_string
WEATHER_API_KEY=your_api_key
```

**Important Notes:** 
- You can create a free PostgreSQL instance directly on Render for your database
- Get your Weather API key by creating a free account at [OpenWeatherMap](https://openweathermap.org/api)

### Step 5: Deploy!
1. Click "Create Web Service"
2. Render will automatically build and deploy your app
3. Your app will be live in 5-10 minutes
4. You'll get a URL like: `https://aeroforecast.onrender.com`

### Troubleshooting (If Something Goes Wrong)
- **Build failing?** Check the logs to make sure all dependencies are installing correctly
- **App crashing?** Verify that your environment variables are set correctly
- **Database not connecting?** Double-check your PostgreSQL connection string

---

## Project Structure

```
aeroforecast/
├── client/                      # Frontend React app
│   ├── public/                  # Static files
│   └── src/
│       ├── assets/              # Images, fonts, and other static assets
│       ├── components/          # Reusable UI components
│       │   ├── ui/              # Radix UI components
│       │   ├── AirQualityDetails.tsx           # Air quality visualization
│       │   ├── AnimatedWeatherIcon.tsx         # Weather condition animations
│       │   ├── CompareLocations.tsx            # Location comparison feature
│       │   ├── CustomCursor.tsx                # Custom cursor component
│       │   ├── FavoriteLocations.tsx           # Saved locations
│       │   ├── ForecastCard.tsx                # Weather forecast display
│       │   ├── HourlyForecast.tsx              # Hourly forecast view
│       │   ├── SearchBar.tsx                   # Location search
│       │   ├── ThemeToggle.tsx                 # Dark/Light theme switcher
│       │   ├── UnitToggle.tsx                  # Temperature unit toggle
│       │   ├── WeatherBackground.tsx           # Dynamic weather backgrounds
│       │   └── WeatherCard.tsx                 # Main weather display card
│       │
│       ├── hooks/                    # Custom React hooks
│       ├── lib/                      # Utility functions and helpers
│       ├── pages/                    # Main application pages
│       │   ├── WeatherApp.tsx        # Main weather application page
│       │   └── not-found.tsx         # 404 page
│       │
│       ├── App.tsx              # Main App component         
│       ├── index.css            # Global styles
│       └── main.tsx             # Application entry point
│
├── server/                      # Backend Express server
│   ├── routes/                  # API route handlers
│   ├── middleware/              # Express middleware
│   ├── services/                # Business logic
│   ├── utils/                   # Utility functions
│   ├── index.ts                 # Server entry point
│   └── vite.ts                  # Vite development server setup
│
├── shared/                      # Shared code between frontend and backend
│   ├── schemas/                 # Validation schemas
│   └── types/                   # TypeScript type definitions
│
├── .github/                     # GitHub configuration
│   └── workflows/               # GitHub Actions workflows
│
├── .vscode/                     # VS Code settings
│   └── settings.json            # Workspace settings
│
├── public/                      # Root static files
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── README.md                    # Project documentation
```

---

## Design Philosophy

This app's design is inspired by Apple Weather and Weather.com:

- **Clean UI** - No clutter, clean and simple
- **Intuitive** - No confusion, everything makes sense
- **Responsive** - Works perfectly on mobile, tablet, and desktop
- **Accessible** - Easy to use for everyone
- **Modern** - Follows the latest design trends

---

## How to Get API Keys?

### Weather API Key:
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Navigate to the API Keys section
4. Copy your key and add it to your `.env` file

---

## Pro Tips

1. **Free Tier Limits:** Render's free tier gives you 750 hours per month. If you're not using the app, it goes into sleep mode.

2. **Custom Domain:** You can connect your own custom domain later (e.g., myweatherapp.com)

3. **Database Backups:** Don't forget to take regular backups if you have important data

4. **Monitoring:** Regularly check the logs in your Render dashboard

5. **Auto Updates:** Whenever you push code to GitHub, Render will automatically redeploy

---

## Support

If you're running into issues:
- Post in GitHub Issues
- Check the documentation
- Ask in community forums

---

## License

MIT License - Free to use, modify, and distribute!

---

**Made with love for weather enthusiasts!**

Happy Coding!