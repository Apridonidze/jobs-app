import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import Authentication from './containers/Authentication';
import Login from './containers/Login';
import Sign from './containers/Sign';
import Main from './containers/Main';

const App = () => {

  const isAuthorized = false ; //temporary (replace it with cookie)

  const router = createBrowserRouter([
  
    {path: '/', element : isAuthorized ? <Main /> : <Authentication />},
    {path: '/authentication', element : !isAuthorized && <Authentication />},
    {path : '/authentication/login', element : <Login />},
    {path : '/authentication/sign', element : <Sign/>}
  
  ])

  return (
    
    <div className="app-container">
    
      <RouterProvider router={router}></RouterProvider>
    
    </div>
  
  );
};


export default App;