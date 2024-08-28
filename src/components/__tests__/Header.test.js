const { render, screen, fireEvent } = require("@testing-library/react")
import { Provider } from "react-redux";
import appStrore from '../../utils/appStore';
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"

it("should render header component with a login button", () => {
    render(
    <BrowserRouter>
        <Provider store={appStrore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});
    // const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
});

it("should render header component with a cart items 0", () => {
    render(
    <BrowserRouter>
        <Provider store={appStrore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    );

    const cartItems = screen.getByText("Cart(0 items)");
    // const loginButton = screen.getByText("Login");

    expect(cartItems).toBeInTheDocument();
});

it("should render header component with a cart item", () => {
    render(
    <BrowserRouter>
        <Provider store={appStrore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    );

    const cartItems = screen.getByText(/Cart/);
    // const loginButton = screen.getByText("Login");

    expect(cartItems).toBeInTheDocument();
});

it("Should Change Login button to Logout on click", () => {
    render(
    <BrowserRouter>
        <Provider store={appStrore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});
    
    fireEvent.click(loginButton);

    const logoutBUtton = screen.getByRole("button", {name: "Logout"})

    expect(logoutBUtton).toBeInTheDocument();
});

// it("Should Change the logout button to logout", () => {
//     render(
//         <BrowserRouter>
//             <Provider store={appStrore}>
//                 <Header/>
//             </Provider>
//         </BrowserRouter>
//     );

//     const logoutButton = screen.getByRole("button", {name : "Logout"});
//     fireEvent.click(logoutButton);
//     const loginButton = screen.getByRole("button", {name: "Login"});

//     expect(loginButton).toBeInTheDocument();

// })