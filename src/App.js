import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestraurantMenu';
import '../dist/output.css';
import UserContext from './utils/userContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from "./components/Cart";

const AppLayout = () => {
  const [userInfo, setUserInfo] = useState();
  // Authentication
  useEffect(() => {
    //make an API call and send username and password
    const data = {
      username: "Ekant Verma",
      // password: "password456"
    }
    setUserInfo(data.username);
  }, []);


  return (
    <Provider store={appStore}> 
    <UserContext.Provider value={{ loggedInUser: userInfo, setUserInfo}}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    </Provider>
  )
}
  
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    exact: true,

    children:[
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About />,
        exact: true,
      },
      {
        path: "contact",
        element: <Contact/>,
        exact: true,
      },
      {
        path:"/restaurants/:resId",
        element : <RestaurantMenu/>,
        exact:true,
      },
      {
        path:"/Cart",
        element: <Cart/>,
        exact:true,
      },
    ],
    errorElement: <Error/>
  }
]);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<RouterProvider router={appRouter}/>);
  