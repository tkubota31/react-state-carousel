import React from "react";
import { render } from "testing-library/react";
import Card from "./Card"

test("if it renders without crashing", () =>{
    render(<Card />);
})

test("if it matches snapcshot", () =>{
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
})
