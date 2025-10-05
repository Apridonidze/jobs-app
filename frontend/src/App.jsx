import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie'

import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';
import NotFound from './containers/NotFound';
import { useState } from 'react';

const App = () => {
  
  const [cookies, setCookies , removeCookies] = useCookies(['token'])

  let isAuthorized = false
  
  const router = createBrowserRouter([
    
    {path: '/', element : isAuthorized ? <Main /> : <Navigate to='/authentication' />},//directs user to authentication page when not loggined
    {path: '/authentication', element : !isAuthorized && <Authentication />}, //directs user to main page when loggined
    {path : '/sign', element : <Sign/>},
    {path : '/login', element : <Login />},
    {path : '*', element : <NotFound />}
  ])
  
  
  
  return (
    
    <div className="app-container">


        <RouterProvider router={router}></RouterProvider>
        

    </div>
  
  );
};


export default App;