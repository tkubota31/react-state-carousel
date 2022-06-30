import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("if it renders without crashing", () =>{
  render(<Carousel />);
})

test("if it matches snapcshot", () =>{
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

test("that the left arrow button works", () =>{
  const { queryByTestId, queryByAltText} = render(<Carousel />)
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

})


test("that the arrows show and hide when appropriate", () =>{
  const { queryByTestId, queryByAltText} = render(<Carousel />)
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).toHaveClass("hidden");

  fireEvent.click(rightArrow);

  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);

  expect(rightArrow).toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");
})
