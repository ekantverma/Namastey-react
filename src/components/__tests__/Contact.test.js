import { render, screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom"

//Unit Testing

test("Shoult load contact us component", () => {
    render(<Contact />);
    //Querying
    const inputBoxes = screen.getAllByRole("textbox");
    // console.log(inputBoxes);
    //Assertion
    expect(inputBoxes.length).toBe(3);
});

// for many test cases we can write like 
describe('Contact us page test cases', () => {

    // beforeAll(() => {
    //     console.log("Before all tests");
    // })

    // beforeEach(() => {
    //     console.log("Before each test");
    // })

    // afterAll(() => {
    //     console.log("After all tests");
    // })

    // afterEach(() => {
    //     console.log("After each test");
    // })

    test("Shoult load 2 input us component", () => {
        render(<Contact />);
        const inputBoxes = screen.getAllByRole("textbox");
        expect(inputBoxes.length).toBe(3);
    });
    // Same working of test and it
    it("Shoult load 1 submit button component", () => {
        render(<Contact />);
        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();
    });
});