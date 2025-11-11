import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie'

import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';
import NotFound from './containers/NotFound';
import MyUser from './myuser/MyUser';
import OtherUser from './containers/OtherUser';

const App = () => {
  
  const [ cookies ] = useCookies(['token'])

  
  const router = createBrowserRouter([
    
    {path: '/', element : cookies ? <Main /> : <Navigate to='/authentication' />},//directs user to authentication page when not loggined
    {path: '/authentication', element : <Authentication /> }, //directs user to main page when loggined
    {path : '/sign', element :<Sign />}, //check if user has cookies and make them direct to main page if so (do not change now)
    {path : '/login', element : <Login />},//check if user has cookies and make them direct to main page if so (do not change now)
    {path : '/my-account', element : cookies ? <MyUser /> : <Navigate to='/authentication' />}, //if user doesnot have cookies do not redirect them in this page (add in future)
    {path : '/user-account/:userId', element : cookies ? <OtherUser /> : <Navigate to='/authentication' />},
    {path : '*', element : <NotFound />}
  ])
  
  
  
  return (
    
    <div className="app-container">

      <RouterProvider router={router}></RouterProvider>

    </div>
  
  );
};


export default App;