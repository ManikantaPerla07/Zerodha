# Zerodha Clone - Full-Stack Trading Dashboard

[![Live](https://img.shields.io/badge/Live-Demo-success)](https://zeroodha.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev)
[![Backend](https://img.shields.io/badge/Backend-Node%20%2B%20Express-green)](https://expressjs.com)
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com)
[![Deploy](https://img.shields.io/badge/Deploy-Render-purple)](https://render.com)

A Zerodha-inspired trading dashboard that combines a React frontend and Node/Express backend with MongoDB persistence. The app is deployed as a single full-stack service where Express serves both API routes and static frontend assets.

Live URL: https://zeroodha.onrender.com

Repository: https://github.com/ManikantaPerla07/Zerodha

## Table of Contents

- [Overview](#overview)
- [Feature Highlights](#feature-highlights)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Deploy on Render](#deploy-on-render)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

## Overview

This project recreates a modern broker dashboard experience with watchlist, holdings, portfolio summary, and order placement flow. It is optimized for portfolio presentation and cloud deployment.

## Feature Highlights

- Dashboard-style UI inspired by Zerodha workflow
- Holdings table with chart visualization
- Buy order interaction connected to backend API
- Same-origin API support for single-service deployment
- MongoDB-backed persistence
- Production-ready Render setup with one-click config files

## Tech Stack

Frontend
- React 18
- React Router
- Material UI
- Chart.js + react-chartjs-2
- Axios

Backend
- Node.js
- Express
- Mongoose
- CORS
- dotenv

Deployment
- Render web service (single deployment)

## Architecture

1. React app is built to `dashboard/build`.
2. Express serves API endpoints and static frontend files.
3. MongoDB stores holdings and order data.
4. Render runs one service for both frontend and backend.

## Project Structure

```text
Zerodha/
|- backend/
|  |- index.js
|  |- model/
|  |- schemas/
|  |- package.json
|  |- .env.example
|
|- dashboard/
|  |- src/
|  |- public/
|  |- package.json
|
|- render.yaml
|- Procfile
|- package.json
|- README.md
```

## API Reference

### `GET /allHoldings`
Returns holdings data from MongoDB.

Success response (example):

```json
[
  {
    "name": "INFY",
    "qty": 2,
    "avg": 1450,
    "price": 1555.45,
    "net": "+2.1%",
    "day": "+0.3%"
  }
]
```

### `POST /newOrder`
Creates a new order in MongoDB.

Request body (example):

```json
{
  "name": "INFY",
  "qty": 1,
  "price": 1555.45,
  "mode": "BUY"
}
```

Success response:

```json
{
  "message": "Order saved successfully!"
}
```

## Environment Variables

Create `backend/.env` for local development:

```env
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority&appName=ZerodhaCluster
```

For Render:
- Key: `MONGO_URL`
- Value: your full MongoDB connection URI

If password includes special characters (`@`, `#`, `%`, `/`, `:`), URL-encode it.

## Run Locally

```bash
git clone https://github.com/ManikantaPerla07/Zerodha
cd Zerodha

npm install --prefix backend
npm install --prefix dashboard
npm run build --prefix dashboard

node backend/index.js
```

Open: `http://localhost:3002`

## Deploy on Render

This repo is preconfigured with `render.yaml` and `Procfile`.

Recommended Render settings:

| Setting | Value |
|---|---|
| Runtime | Node |
| Root Directory | (leave empty) |
| Build Command | `rm -rf node_modules backend/node_modules dashboard/node_modules && npm install --prefix backend && npm install --prefix dashboard && npm run build --prefix dashboard` |
| Start Command | `node backend/index.js` |
| Environment Variable | `MONGO_URL` |

## Troubleshooting

If homepage returns `503`:
- Check latest Render logs for startup crash.
- Verify `MONGO_URL` exists in Render env vars.
- Trigger manual redeploy.

If holdings are not loading:
- Check MongoDB Atlas Network Access.
- Check database user credentials and password.
- Confirm your URI database name is correct.

If frontend build fails:
- Re-run build locally: `npm run build --prefix dashboard`
- Verify dependency install in both `backend` and `dashboard`.

## Security Notes

- Do not commit `.env` with real credentials.
- Use `.env.example` for shared config templates.
- Rotate exposed credentials immediately.
- Restrict Atlas network access whenever possible.

## Roadmap

- Authentication and per-user portfolios
- Better order schema validation and history
- Realtime market feed integration
- Portfolio analytics and risk metrics
- Mobile-first responsive refinements

## Author

Manikanta Perla

## License

This project is intended for educational and portfolio use.