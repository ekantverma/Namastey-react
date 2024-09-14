import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestraurantMenu';
import '../dist/output.css';
import UserContext from './utils/userContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from "./components/Cart";
import Login from "./components/Login"; 
import Footer from "./components/Footer";
import Shimmer from './components/Shimmer';
import Search from "./components/Search";


const AppLayout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  // Authentication
  // useEffect(() => {
  //   //make an API call and send username and password
  //   const data = {
  //     username: "Ekant Verma",
  //     // password: "password456"
  //   }
  //   setUserInformation(data.username);
  // }, []);

  const handleLogin = (username) => {
    setUserInfo(username); // Update user info
  };

  const handleLogout = () => {
    setUserInfo(null); // Clear user info
  };

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userInfo, setUserInformation: setUserInfo }}>
        <div className="app">
          <Header />
          <Outlet context={{ onLogin: handleLogin }} /> {/* Pass handleLogin as context */}
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

  
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/search",
        element:<Search/>
      }
    ],
    errorElement: <Error/>
  }
]);

  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<RouterProvider router={appRouter}/>);
  