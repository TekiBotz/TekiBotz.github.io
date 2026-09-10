# Animal Rescue (MERN)

A shelter-adoption web app built on the Austin Animal Center (AAC) outcomes dataset. Visitors browse
adoptable animals, search by breed, page through results, and register an account. Admins get a
user-management area and a read-only shelter table. A separate Jupyter notebook trains a scikit-learn
decision tree on the same data to predict animal outcomes.

The repo was renamed from `TekiBotz.github.io` — the frontend used to deploy to GitHub Pages and the
API to Render. Those deploy-specific settings are now environment variables that default to localhost,
so a fresh clone runs without editing source (see [Running locally](#running-locally)).

## Contents

- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Features](#features)
- [Running locally](#running-locally)
- [Seed data and animal data](#seed-data-and-animal-data)
- [Data-mining component](#data-mining-component)
- [Known issues](#known-issues)
- [License](#license)

## Tech stack

**API** — Node (ES modules, Node 18+), Express 4.19, Mongoose 8.5, MongoDB Atlas. Auth is a signed
JWT (`jsonwebtoken` 9) stored in an httpOnly cookie; passwords hashed with `bcryptjs`. `cors` and
`cookie-parser` handle the browser-facing pieces.

**Frontend** — React 18.3 on Create React App (`react-scripts` 5). Routing with React Router 6.25
(`createBrowserRouter`). State and data fetching with Redux Toolkit 2.2 and RTK Query. UI is React
Bootstrap 2.10 / Bootstrap 5.3, with `react-toastify` for notifications.

**Data mining** — Python notebook using pandas, pymongo, scikit-learn (`DecisionTreeClassifier`,
`LabelEncoder`), and matplotlib. No `requirements.txt`; versions aren't pinned.

## Repository layout

```
backend/
  server.js              Express app: CORS, cookie parsing, route mounting, error handlers
  config/db.js           Mongoose connection to MONGO_URI
  controllers/
    animalController.js  list (paginated, breed keyword) + fetch by id
    userController.js    register, login, logout, profile, admin user CRUD
  models/
    animalModel.js       AAC outcomes schema
    userModel.js         bcrypt hash on save, matchPassword helper
  routes/                animalRoutes (GET only), userRoutes
  middleware/
    authMiddleware.js    protect (reads the jwt cookie), admin
    errorMiddleware.js   notFound + errorHandler
    asyncHandler.js
  utils/generateToken.js signs the JWT, sets the httpOnly cookie
  data/users.js          seed users
  data/animals.js        legacy dummy data, unused (older shape, not wired to anything)
  seeder.js              loads / clears seed users

frontend/src/
  index.js               route table + guards
  App.js                 layout shell (header, footer, toast container)
  store.js               Redux store
  constants.js           API base URL from REACT_APP_API_URL
  slices/
    apiSlice.js          RTK Query base query (sends the auth cookie)
    animalsApiSlice.js   getAnimals, getAnimalDetails
    usersApiSlice.js     auth + admin user endpoints
    authSlice.js         userInfo persisted to localStorage
  screens/               Home, AnimalDetail, Login, Register, Profile,
                         admin/{AnimalList, UserList, UserEdit}
  uiComponents/          Header, Footer, AnimalCard, SearchBar, Paginate, AlertMessage,
                         LoadingSpinner, FormContainer, PrivateRoute, AdminRoute
  utils/dateUtils.js     calculateAge(date_of_birth) -> { years, months }

python_models/           decision_tree_classifier.pkl, label_encoder.pkl, preprocessed_animals.csv
jupyter_notebook/        Butts_Jarrale_AnimalRescue_Data_Mining.ipynb
```

## Features

**Browse.** `HomeScreen` renders a paginated grid of animal cards, 12 per page (`animalController.js`).
Each card shows the name (or "Need A Name"), breed, an age computed from `date_of_birth`, and sex. A
stock dog or cat icon stands in for a photo — the dataset has no images.

**Search.** The search box routes to `/search/:keyword` and the API filters `breed` with a
case-insensitive regex. Breed only; there's no filter by type, age, colour, or outcome.

**Animal detail.** `/animal/:id` fetches one record and shows the same card, larger.

**Accounts.** Register, log in, log out, edit profile. Login and register sign a JWT and set it as an
httpOnly `jwt` cookie that expires in a day. The browser also keeps a non-sensitive `userInfo` blob
(`_id`, `name`, `email`, `isAdmin`) in `localStorage` for rendering and the client-side guards.

**Route guards.** `PrivateRoute` gates `/profile` on being logged in; `AdminRoute` gates `/admin/*`
on `isAdmin`. These are client-side only — the API enforces its own checks with the `protect` and
`admin` middleware.

**Admin area.** `/admin/userlist` lists users with delete and an edit screen that toggles `isAdmin`
(the seeded admin can't be deleted). `/admin/animallist` is a paginated table of every animal, and
it's read-only — there are no create/update/delete routes for animals.

## Running locally

Prereqs: Node 18+, a MongoDB connection string (Atlas or local), and Python 3 with Jupyter if you
want to run the notebook.

**1. Backend env.** Copy `.env.example` to `.env` at the repo root:

```
PORT=4000
NODE_ENV=development
MONGO_URI=<your connection string>
JWT_SECRET=<any random string>
CLIENT_URL=http://localhost:3000
```

`NODE_ENV=development` matters: `generateToken` only drops the `Secure` flag on the cookie in
development, so over plain `http://localhost` the cookie won't stick without it.

**2. Frontend env.** The default (`http://localhost:4000`) already points at the local API. To
override it, copy `frontend/.env.example` to `frontend/.env` and set `REACT_APP_API_URL`.

**3. Install.** Three package trees, installed separately:

```
npm install
npm install --prefix backend
npm install --prefix frontend
```

**4. Run.**

```
npm run dev
```

That starts the API on `:4000` and the CRA dev server on `:3000` together. To run them apart, use
`npm run server` (API, nodemon) and `npm run client` (frontend).

### Scripts (repo root)

| Command | Does |
|---------|------|
| `npm start` | API only, `node backend/server.js`. Root path returns `API is running....` |
| `npm run server` | API under `nodemon` |
| `npm run client` | CRA dev server on `http://localhost:3000` |
| `npm run dev` | API + frontend via `concurrently` |
| `npm run data:add` | Seed the three test users |
| `npm run data:delete` | Delete all users |
| `npm run build` | Install root + frontend deps, build the frontend to `frontend/build` |

## Seed data and animal data

`seeder.js` handles **users only**. `npm run data:add` inserts three accounts (password `123456` for
all three):

| Email | Role |
|-------|------|
| `admin@email.com` | admin |
| `john@email.com` | user |
| `jane@email.com` | user |

Animal data is not seeded. `animalModel.js` mirrors the AAC outcomes dataset — `animal_id`,
`animal_type`, `breed`, `color`, `date_of_birth`, `outcome_type`, `outcome_subtype`,
`sex_upon_outcome`, `location_lat` / `location_long`, `age_upon_outcome_in_weeks`, and so on — and the
browse pages stay empty until an `animals` collection exists in that shape. Load it yourself:
`mongoimport` the AAC "Animal Center Outcomes" export, or import
`python_models/preprocessed_animals.csv` (~10k rows, already cleaned and label-encoded).
`backend/data/animals.js` is leftover dummy data in an older shape and isn't used.

## Data-mining component

`jupyter_notebook/Butts_Jarrale_AnimalRescue_Data_Mining.ipynb` connects to the same Atlas database
with pymongo, drops rows missing `outcome_type`, label-encodes `breed` / `sex_upon_outcome` /
`outcome_type`, derives `days_since_birth` from `date_of_birth`, and trains a `DecisionTreeClassifier`
on a 75/25 split to predict `outcome_type`.

Results recorded in the notebook: about 54% accuracy. It does reasonably on `Adoption` (the largest
class) and gets zero correct predictions on rare classes like `Died` and `Rto-Adopt`. The notebook
names class imbalance as the main thing to address.

`python_models/` holds the trained artifacts:

| File | What it is |
|------|-----------|
| `decision_tree_classifier.pkl` | the fitted tree (~800 KB) |
| `label_encoder.pkl` | the fitted `LabelEncoder` |
| `preprocessed_animals.csv` | ~10k rows: original columns plus the encoded ones and a numeric `age` |

The Node app doesn't load any of this. The notebook and pickles stand on their own.

## Known issues

- **Admin redirect path.** `AdminRoute` redirects rejected users to `login` (relative), which
  resolves to `/admin/login` from an admin URL and matches no route. `PrivateRoute` uses `/login`
  correctly; `AdminRoute` should too.
- **`updateUser` response.** `userController.updateUser` builds its JSON response from `updateUser`
  (the imported function) instead of `updatedUser` (the saved document), so a successful admin user
  edit returns `undefined` fields. The write itself succeeds.
- **Cross-domain cookies.** The auth cookie is `sameSite: 'strict'`. Fine for local dev, where the
  frontend and API are both on `localhost`, but if they're deployed to different domains the browser
  won't send it — that case needs `sameSite: 'none'` with `secure: true`.
- **Two moderate `npm audit` advisories.** Both are `qs` denial-of-service advisories pulled in
  through Express 4's dependency tree. No patched Express 4 release clears them; fixing them means
  migrating the API to Express 5.

## License

MIT — see [LICENSE](LICENSE).
