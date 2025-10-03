# AeroForecast - Your Personal Weather Companion 

Hey there! Welcome to AeroForecast - your go-to weather app that makes checking the weather actually enjoyable! I've packed it with all the features you need, wrapped in a beautiful and easy-to-use interface.

---

## What Can You Do With AeroForecast? 

###  **Get Live Weather Updates**
See what's happening right now! Check the current temperature, how humid it is, wind speed, and lots more - all in real-time. No more guessing if you need that jacket!

###  **Search Any City, Anywhere**
Curious about the weather in Paris? Tokyo? Your hometown? Just type in any city name and boom - instant weather info at your fingertips!

###  **Switch Between Dark & Light Mode**
Whether you're a night owl or prefer bright screens, we've got you covered. Toggle between dark and light themes based on your mood or time of day.

###  **Save Your Favorite Places**
Checking the same cities over and over? Add them to your favorites! Quick access to weather info for places you care about - whether it's home, work, or where your loved ones live.

###  **Compare Weather Between Cities**
Planning a trip or just curious? Compare weather conditions between two cities side-by-side. Perfect for deciding between beach vs. mountains for the weekend!

###  **Hourly Forecast for the Next 24 Hours**
Need to plan your day down to the hour? Check out our detailed hourly breakdown - know exactly when it'll rain, when the sun comes out, and when it's best to go for that run.

###  **7-Day Weather Forecast**
Be prepared for the entire week ahead! Our 7-day forecast helps you plan everything from your outfits to outdoor activities without any weather surprises.

###  **Auto-Detect Your Location**
Too lazy to type? No worries! Just allow GPS access and AeroForecast will automatically show you the weather right where you are. It's that simple!

---

## Why You'll Love AeroForecast 

I built this app with YOU in mind - making weather checking fast, fun, and hassle-free. Whether you're planning your day, week, or just satisfying your curiosity, AeroForecast has got your back!

Stay weather-ready, stay awesome! 

---
## What Powers AeroForecast? 

Curious about what's under the hood? Here's a peek at the awesome technologies we use to make AeroForecast work smoothly!

---

###  **Frontend (What You See & Interact With)**

**React 18** - The magic behind our beautiful interface  
This is what makes everything look good and work smoothly! Think of it as the artist that paints what you see on your screen.

**TypeScript** - Our safety net  
Helps us write cleaner, bug-free code so you get a smooth experience. It's like having a spell-checker, but for code!

**Vite** - Lightning-fast development  
Super speedy tool that helps us build and update the app quickly. The faster we build, the faster you get new features!

**Tailwind CSS** - Making things pretty  
This is our styling toolkit that makes AeroForecast look modern and gorgeous. Every button, card, and color you see? That's Tailwind at work!

**Radix UI** - Pre-built beautiful components  
Ready-made building blocks that look amazing and work perfectly. Like LEGO pieces, but for web apps!

---

###  **Backend (The Behind-the-Scenes Hero)**

**Express.js** - Our server powerhouse  
This handles all the heavy lifting in the background - fetching data, processing requests, and making sure everything runs like clockwork.

**TypeScript** - Type-safe backend too!  
Yep, we use it on the backend as well! Keeps our server code rock-solid and reliable.

**Serverless PostgreSQL** - Where we store your favorites  
A super reliable database that remembers all your favorite cities safely and securely. Your data is in good hands!

**Drizzle ORM** - Database made simple  
Makes talking to our database easy and efficient. Think of it as a friendly translator between our code and the database.

---

###  **Other Cool Tools We Use**

**TanStack Query** - Smart data management  
Handles all the weather data fetching and keeps things cached so the app loads super fast. No unnecessary waiting!

**Weather API** - Real-time weather magic  
Our trusted source for accurate, up-to-the-minute weather data from around the globe. This is where all the weather info comes from!

---

###  **In Simple Terms...**

I've combined the best modern technologies to create an app that's:
- **Fast**  - Loads in a blink
- **Reliable**  - Works consistently every time
- **Beautiful**  - Easy on the eyes
- **Smart**  - Remembers what you love

All so you can check the weather without any hassle!

---

## Local Development (Running on Your Computer)

### Step 1: Clone the Repository
```bash
git clone https://github.com/being-souL1230/weather_app.git
cd weather_app
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


## Project Structure

```
weather_app/
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
## Our Design Philosophy 

I wanted AeroForecast to feel familiar yet fresh, so I took inspiration from the best in the business - Apple Weather and Weather.com. Here's what I believe in:

###  **Clean & Simple UI**
No mess, no stress! I keep things minimal and clutter-free. Only what you need, when you need it. Your eyes (and brain) will thank us!

###  **Super Intuitive**
Everything just makes sense! No hunting for buttons or wondering "what does this do?" I designed it so naturally that you'll feel like you've been using it forever.

###  **Responsive Everywhere**
Phone? Tablet? Desktop? We've got you covered! AeroForecast looks gorgeous and works flawlessly on any screen size. Try it yourself - resize your browser and watch the magic!

###  **Accessible to Everyone**
I built this for EVERYONE. Whether you use a screen reader, prefer keyboard navigation, or need high contrast - AeroForecast is designed to be easy and comfortable for all.

###  **Modern & Fresh**
I follow the latest design trends to keep things looking sharp and contemporary. But don't worry - we never sacrifice usability for looks!

---

## Getting Your API Calls 

Don't worry, it's super easy and completely FREE! Here's how:

###  **Open-Meteo API Calls:**

**Step:** Head over to [Open-Meteo](https://open-meteo.com/en/docs)  
Just click the link - it'll open in a new tab!

---

## About This Project 

This project was assigned to me by Frontend Mentor, where Matt serves as the admin. Frontend Mentor is an amazing platform that helps developers improve their coding skills through real-world projects and challenges!

**Want to level up your skills too?** Check out [Frontend Mentor](https://www.frontendmentor.io/) and start building!

---

## License 

**MIT License** - Yep, it's FREE! 

---
