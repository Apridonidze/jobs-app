import { useCookies } from 'react-cookie';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'; //importing react libraries

import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';
import NotFound from './containers/NotFound';
import MyUser from './myuser/MyUser';
import OtherUser from './containers/OtherUser'; //importing react container components

const App = () => {
  
  const [ cookies ] = useCookies(['token']) ;//cookies
  const hasToken = cookies.token && cookies.token !== "undefined"; //checks if user has cookies

  const router = createBrowserRouter([
    
    {path: '/', element : hasToken ? <Main /> : <Navigate to='/authentication' />  },//directs user main page if he has cookies , else component navigates user to authentication page(cookies required)
    {path: '/authentication', element : <Authentication /> }, //directs user to authentication component (cookies not required)
    {path : '/sign', element :<Sign />}, //directs user to sign page (cookies not requiured)
    {path : '/login', element : <Login />},//directs user to login page (cookies not requiured)
    {path : '/my-account', element : hasToken ? <MyUser /> : <Navigate to='/authentication' />}, //directs user to their user page , if they do not have cookies then component navigates user to authentication page
    {path : '/user-account/:userId', element : hasToken ? <OtherUser /> : <Navigate to='/authentication' />}, //directs user to other users page , if they do not have cookies then component navigates user to authentication page
    {path : '*', element : <NotFound />}//directs user to not found page component when they visit invalid page
  ]);//routes 
  
  return (
    
    <div className="app-container">

      <RouterProvider router={router}></RouterProvider>

    </div>
  
  );
};//implementing routerprovider to provide user with routes 

export default App; //exporting component