import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const App = () => {

  const isAuthorized = false ; //temporary (replace it with cookie)

  const router = createBrowserRouter([
  
    {path: '/', element : isAuthorized ? <div>Main</div> : <div>Login</div>},//replace divs with components
    {path: '/login', element : !isAuthorized && <div>Login</div>}//replace divs with components
  
  ])

  return (
    
    <div className="app-container">
    
      <RouterProvider router={router}></RouterProvider>
    
    </div>
  
  );
};


export default App;