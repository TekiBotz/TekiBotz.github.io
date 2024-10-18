# AnimalRescue - Getting Started

This project is a Pet Rescue Shelter App built using React and bootstrapped with Create React App.

## Project Overview

The AnimalRescue app provides a platform for users to browse available pets and view detailed information about each one. The app is structured with a clean interface using React, React Router for routing, and React Bootstrap for layout and styling.

### Key Features:

- Dynamic pet listing and detail pages
-	User login (Sign In) and authentication
-	Admin dashboard for managing pets and users
-	Paginated data for large lists of pets
-	Age calculation for pets based on their birthdate
-	Responsive and accessible design for optimal use on all devices
-	Search and filter functionality for easy browsing

## Available Scripts

In the project directory, you can run:

### npm start

Runs the app by starting the backend server located in backend/server.js.
Open http://localhost:3000 to view the app in your browser.

### npm run server

Runs the backend server using nodemon for automatic restarts on code changes.

### npm run client

Starts the React frontend. It will run on http://localhost:3000.

### npm run dev

Runs both the backend and the frontend concurrently for development.
The backend will be accessible on http://localhost:5000 and the frontend on http://localhost:3000.

### npm run data:add

Runs a data seeder script (backend/seeder.js) to populate the database with initial data.

### npm run data:delete

Runs the data seeder script with the -d flag to delete all data from the database.

### npm run build

Installs all necessary dependencies for both the backend and the frontend. Then builds the frontend for production by bundling the React app and placing the output in the frontend/build folder.

## Folder Structure

-	/public: Contains static assets such as the app’s HTML template and images.
-	/src: The main source code of the app. This includes:
-	/components: Reusable UI components like the Header, Footer, and Cards.
-	/screens: Pages of the app (Home, Animal Details, Admin Dashboard, User List).
-	/slices: Redux slices for state management (user, animal data, etc.).
-	/utils: Utility functions like calculateAge for dynamic age calculations.
-	/assets: Image assets (e.g., logos, pet images).
-	/uiComponents: Custom UI elements such as AlertMessage, LoadingSpinner, and Paginate.

## Styling and Framework

The app uses React Bootstrap for layout and design, making it responsive and visually consistent across devices. Styling is done primarily through Bootstrap classes with minimal custom CSS for ease of maintenance.

Backend and API

The app integrates with a backend API for managing pet and user data. CRUD operations are performed for users, pets, and other relevant resources. Authentication is handled using JSON Web Tokens (JWT), and state management is achieved through Redux Toolkit.

### Learn More

For more information on how Create React App works, visit the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn more about React, check out the [React documentation](https://reactjs.org/).

## Advanced Topics

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting) for better performance.
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size) to optimize load times.
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app) for offline capabilities.
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration) for customizing your React build.

## Deployment

To deploy your app, refer to the [deployment guide](https://facebook.github.io/create-react-app/docs/deployment) in the React documentation.

### Troubleshooting

For build issues such as minification errors, refer to [troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).

---

This README provides an overview of the AnimalRescue app and essential details to get started with its development and deployment!