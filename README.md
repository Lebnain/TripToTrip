# ✦ TripToTrip — AI Trip Planner

A beautiful, AI-powered day-by-day travel itinerary planner built with **Nuxt 3**, **Tailwind CSS**, and the **Claude API**.

## Features

- 🗺️ **Day-by-day itineraries** for any destination worldwide
- ⏰ **Timed schedules** with morning → evening flow
- 🍽️ **Meal recommendations** — breakfast, lunch, and dinner
- 💡 **Insider tips** for every activity
- 💰 **Budget estimates** per day and per activity
- 🏨 **Accommodation suggestions** by neighborhood
- 🎯 **Interest-based customization** — food, adventure, culture, etc.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Nuxt 3 |
| UI | Vue 3 + Tailwind CSS |
| AI | Anthropic Claude API |
| Runtime | Node.js 18+ |

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### 4. Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
trip-planner/
├── assets/css/
│   └── main.css              # Global styles + Tailwind
├── components/
│   ├── ActivityItem.vue       # Individual activity card
│   ├── DayCard.vue            # Full day itinerary card
│   └── ItineraryHeader.vue    # Trip summary header
├── pages/
│   └── index.vue              # Main planner page
├── server/api/
│   └── generate-itinerary.post.ts  # Claude API route
├── nuxt.config.ts
└── tailwind.config.js
```

## Customization

### Changing the AI model
Edit `server/api/generate-itinerary.post.ts`:
```ts
model: 'claude-sonnet-4-20250514'  // Change model here
```

### Adjusting max trip length
Default max is 30 days. Change in the same file:
```ts
if (days < 1 || days > 30) { ... }
```

### Styling
All design tokens are in `tailwind.config.js` under `theme.extend.colors`.
The `sand` palette controls the warm neutral tones throughout the UI.
