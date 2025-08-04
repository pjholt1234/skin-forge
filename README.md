
# Skin forge - CSGO Crafting Application

I decided to combine both learning typescript, html canvas and its supporting JS API and MongoDB. The project was designed to be a room planner, heavily inspired by Canva

## Technologies
1. Typescript
2. React
3. NextJS
4. MySQL
5. Prisma

## Installation
1.  Create local instance of MySQL / MariaDB database
    *Take note of db name*
2. Navigate to `/backend`
3. Copy `.env.example` and rename to `.env`
   *Example values*
   APP_ENV="development"  
   APP_PORT=9999  
   BASIC_AUTH_SECRET="testing123"  
   AUTH_TOKEN="dGVzdGluZzEyMw"
   JWT_SECRET="testing123"  
   APP_NAME="Skin Forge"  
   STEAM_API_KEY="" ***See steam scraper section***
   DATABASE_URL="mysql://[DB-ROOT-USER]:[DB-ROOT-PASS]@localhost:3306/[DB-NAME]"
4. Navigate to `/nextjs`
5. Copy `.env.example` and rename to `.env`
   *Example values*
   NEXT_PUBLIC_AUTH_TOKEN="dGVzdGluZzEyMw"  
   NEXT_PUBLIC_BACKEND_URL="http://localhost:9999"  
   JWT_SECRET="testing123"  
   APP_NAME="Skin Forge"

6. Run `npm run build` in `/nextjs`.
   *This fixes a weird bug where docker doesn't create a build_id*

7. Run `docker compose up`
8. Visit http://localhost:3000

## Testing
1. Create a test database
2. Navigate to `/backend`
3. Copy `.env.test.example` and rename to `.env.test`
4. Add env values

## Steam item scraper
To populate the database with steam items and images you need to do the following.

### Item scraper
1. Go to https://steamapis.com/
2. Sign in using steam
3. Add balance
4. Create key
5. Plug key into `STEAM_API_KEY`
6. Run `node ./backend/dist/commands/UpdateItems.js`

### Preview image scraper
1. `node ./dist/commands/ScrapeImageUrls.js` 
