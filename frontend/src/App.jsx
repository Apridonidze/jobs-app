import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie'

import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';
import NotFound from './containers/NotFound';

const App = () => {
  
  const [cookies, setCookies , removeCookies] = useCookies(['token'])

  
  const router = createBrowserRouter([
    
    {path: '/', element : cookies ? <Main /> : <Navigate to='/authentication' />},//directs user to authentication page when not loggined
    {path: '/authentication', element : !cookies && <Authentication />}, //directs user to main page when loggined
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