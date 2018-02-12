# Project Konjosh

Project Konjosh is a smart autocategorizing To-Do app.

## Getting Started

1. Create the `.env`. You will need API keys for Amazon, Google, and OMDB.
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Copy our database infile: `psql > infile`
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Amazon Product API
- Bcrypt
- Bootstrap
- Express
- EJS
- Googleplaces-promises
- jQuery
- JsonWebToken
- Knex
- Knex-logger
- Morgan
- Node Sass Middleware
- OMDB Api Client
- PostgreSQL
- PopperJS
