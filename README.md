# Animal Rescue (MERN)

A shelter-adoption app built on the Austin Animal Center outcomes dataset.
Browse animals, search by breed, page through results; admins get user
management and a read-only shelter table.

This started as a Jupyter/Dash dashboard in early 2024 — a data table with a
map and a pie chart. I rebuilt it as a MERN app for my capstone, then added
search, pagination, and a decision-tree classifier as separate enhancements.
Came back to it in 2026 to fix an auth path that didn't work.

## Why it looks like this

The Dash version showed everything in one table. Cards with a click-through
detail view made more sense — you see the few things that matter per animal,
then drill in if you care.

Dash's built-in pagination just gives you every page number. I wrote a component
that shows a window of six, with the start and end calculated from wherever you
are. Same reason: the table was showing more than anyone needed.

Search is breed-only. That's the field people actually filter on for this dataset.

## The data-mining piece

`jupyter_notebook/` has a scikit-learn decision tree that predicts outcome type
(adopted, transferred, and so on) from breed, age, and sex, pulling from the same
MongoDB Atlas instance over PyMongo. It gets about 54% accuracy — fine on
`Adoption`, which dominates the dataset, and zero on rare outcomes like `Died`.
Class imbalance is the obvious thing to fix and I didn't.

The trained model and encoder are checked into `python_models/`. The Node app
doesn't load them — the notebook stands alone.

## What I fixed in 2026

`generateToken` set an httpOnly cookie, but `protect` read a Bearer header, and
the frontend sent a token that the login response never returned. So admin
endpoints couldn't authenticate at all. Unified everything on the cookie.

Also renamed a `JWT_SECRETE` typo, pulled the hardcoded Render and GitHub Pages
URLs out into env vars, patched a critical Mongoose NoSQL injection advisory, and
deleted two components that were never mounted.

## Running it

Needs Node 18+ and a MongoDB connection string.

```
npm install
npm install --prefix backend
npm install --prefix frontend
cp .env.example .env # set MONGO_URI and JWT_SECRET
npm run dev # API :4000, frontend :3000
```

`NODE_ENV=development` matters — the auth cookie keeps its `Secure` flag
otherwise and won't stick over plain http.

Animal data isn't seeded. `npm run data:add` creates three test users
(password `123456`); the animals collection you have to import yourself, either
from the AAC dataset or from `python_models/preprocessed_animals.csv`.

## Known issues

- `updateUser` builds its response from the imported function instead of the
  saved document, so a successful edit returns undefined fields.
- Auth cookie is `sameSite: 'strict'` — fine locally, breaks if the frontend and
  API end up on different domains.
- `npm audit`: 2 moderate in the backend (qs, via Express 4), ~70 in the CRA
  toolchain.
