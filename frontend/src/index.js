import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom' // Enable routes
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminRoute from './uiComponents/AdminRoute.jsx';
import PrivateRoute from './uiComponents/PrivateRoute.jsx';
import AnimalListScreen from './screens/admin/AnimalListScreen.jsx';
import HomeScreen from './screens/HomeScreen';
import AnimalDetailScreen from './screens/AnimalDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path='/' element={<App />}>
      {/* Routes for public access */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/animal/:id' element={<AnimalDetailScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Routes requiring authentication  */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* Routes for admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/animallist' element={<AnimalListScreen />} />
        <Route path='/admin/animallist/:pageNumber' element={<AnimalListScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)

// Render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Provide Redux store to the app */}
      <RouterProvider router={router} />  {/* Set up routing */}
    </Provider>
  </React.StrictMode>
);

// Measure and log performance metrics
reportWebVitals();
