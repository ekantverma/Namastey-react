import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Body from "../Body";
import MOCK_DATA from "../mocks/resListMock.json";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
});

//Integrity Testing
it("Should render the body component with search button", async () => {
   await act(async () => render(
   <BrowserRouter>
        <Body/>
    </BrowserRouter>
   ));

   const searchBtn = screen.getByRole("button", {name: "Search"});

   const searchInput = screen.getByTestId("searchInput");
   fireEvent.change(searchInput, { target: {value: "burger"} });
   fireEvent.click(searchBtn);

   // screen should load 4 cards
   const cards = screen.getAllByTestId("resCard");

   expect(cards.length).toBe(2);
})