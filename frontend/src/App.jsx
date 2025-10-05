import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CookiesProvider,useCookies } from "react-cookie";


import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';
import NotFound from './containers/NotFound';

const App = () => {


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

      <CookiesProvider>

        <RouterProvider router={router}></RouterProvider>
        
      </CookiesProvider>

    </div>
  
  );
};


export default App;