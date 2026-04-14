# Zerodha Clone - Full-Stack Trading Dashboard

A full-stack Zerodha-inspired trading dashboard built with React and Express, backed by MongoDB. The application is deployed as a single service where the backend serves both API routes and the frontend build.

Live Demo:
https://zeroodha.onrender.com

Repository:
https://github.com/ManikantaPerla07/Zerodha

## Overview

This project replicates a modern trading interface with watchlist, holdings views, order actions, and dashboard metrics. It is designed for portfolio and learning use, with deployment-ready configuration for Render.

## Key Features

- Interactive trading-style dashboard UI
- Watchlist and holdings screens
- Buy action flow with backend API integration
- Single-service architecture for easy deployment
- MongoDB integration for persistent data
- Production-ready Render configuration

## Tech Stack

Frontend:
- React
- React Router
- Material UI
- Chart.js
- Axios

Backend:
- Node.js
- Express
- Mongoose
- CORS
- dotenv

Deployment:
- Render (single web service)

## Project Structure

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

## Architecture

1. React app is built into static assets in dashboard/build.
2. Express serves API endpoints and static frontend files.
3. MongoDB stores holdings/order data.
4. One Render service runs the complete app.

## API Endpoints

GET /allHoldings
- Returns holdings data from MongoDB.

POST /newOrder
- Creates a new order document.

## Environment Variables

Create backend/.env for local development (do not commit secrets):

	MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority&appName=ZerodhaCluster

For Render, add the same key in service environment variables:

- Key: MONGO_URL
- Value: your full MongoDB URI

Note:
- If your password contains special characters, URL-encode it.

## Run Locally

1. Clone the repository:

	git clone https://github.com/ManikantaPerla07/Zerodha
	cd Zerodha

2. Install dependencies:

	npm install --prefix backend
	npm install --prefix dashboard

3. Build frontend:

	npm run build --prefix dashboard

4. Start backend server:

	node backend/index.js

5. Open in browser:

	http://localhost:3002

## Deploy on Render

This repository is already configured for Render using render.yaml.

Build Command:

	rm -rf node_modules backend/node_modules dashboard/node_modules && npm install --prefix backend && npm install --prefix dashboard && npm run build --prefix dashboard

Start Command:

	node backend/index.js

Deployment Steps:

1. Create a new Web Service in Render.
2. Connect this GitHub repository.
3. Keep root directory empty.
4. Add environment variable MONGO_URL.
5. Deploy.

## Production Notes

- Frontend and backend are deployed together in a single service.
- Frontend API calls support same-origin deployment.
- Service supports Render cold starts and startup resilience.

## Troubleshooting

If homepage returns 503:
- Check latest Render deploy logs.
- Verify MONGO_URL is set correctly.
- Trigger manual redeploy.

If holdings fail to load:
- Confirm MongoDB Atlas Network Access allows your Render service.
- Confirm MongoDB user/password are valid.

If frontend build fails:
- Ensure dashboard dependencies install successfully.
- Re-run build command locally to reproduce.

## Security Checklist

- Do not commit .env files with real credentials.
- Rotate MongoDB credentials if a secret was exposed.
- Keep Atlas IP access restricted when possible.

## Roadmap

- Authentication and user sessions
- Better order schema and validations
- Portfolio analytics and insights
- Realtime price integration
- Improved mobile responsiveness

## Author

Manikanta Perla

## License

This project is intended for educational and portfolio use.