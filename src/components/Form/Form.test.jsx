import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import Form from ".";

test("Koşulların onay durumuna göre buton aktifliği", () => {
  render(<Form />);


  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  
  expect(checkbox).not.toBeChecked();

  
  expect(button).toBeDisabled();

  
  fireEvent.click(checkbox);

  
  expect(button).toBeEnabled();

  
  fireEvent.click(checkbox);

  
  expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim erkana gelir", () => {
  render(<Form />);

  
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText(/size gerçekten/i);

  
  expect(alert).not.toBeVisible();

  
  fireEvent.click(checkbox);

  
  fireEvent.mouseEnter(button);

  
  expect(alert).toBeVisible();

  
  fireEvent.mouseLeave(button);

  
  expect(alert).not.toBeVisible();
});
