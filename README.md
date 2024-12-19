# Prducts Dashboard - Backend

## Project Setup

#### Backend

1. Install dependencies
   ```
   npm install
   ```
2. Create `.env` and add below code
   ```
   PORT=5000
   JWT_TOKEN_SECRET="secret"
   JWT_TOKEN_EXPIRESIN="1h"
   COOKIE_MAXAGE=36
   HASH_SALT="your-salt"
   MONGODB_URL="mongodb://localhost:27017/jc-data"
   ```
3. Run the application
   ```
   npm run start:dev
   ```
