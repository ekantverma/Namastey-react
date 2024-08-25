const { render, screen, fireEvent } = require("@testing-library/react")
const { act } = require("react")
import { Provider } from "react-redux";
import Header from "../Header";
import RestaurantMenu from "../RestraurantMenu"
import MOCK_DATA from "../mocks/resMenuListMock.json";
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom";
import "@testing-library/dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
})


it('Should load Restraurant menu component', async () => {

    await act(async () => render(
    <BrowserRouter>
    <Provider store={appStore}>
    <Header/>
    <RestaurantMenu/>
    </Provider>
    </BrowserRouter>
    ));

    const accordianHeader = screen.getByText("Rs 99 Deal Of The Day (10)");
    fireEvent.click(accordianHeader);

    const foodItems = screen.getAllByTestId("foodItems").length;

    expect(foodItems).toBe(10);

    const addBtns = screen.getAllByRole("button", {name: "Add"});
    fireEvent.click(addBtns[0]);

    const itemNum = screen.getByText("Cart(1 items)");
    expect(itemNum).toBeInTheDocument();
})