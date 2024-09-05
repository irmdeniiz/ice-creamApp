import { fireEvent, render, screen } from "@testing-library/react";
import Scoops from "./index";
import userEvent from "@testing-library/user-event";


test("API'dan alınan veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);

 
  const images = await screen.findAllByAltText("çeşit-resim");

  
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi", async () => {
 
  const user = userEvent.setup();

 
  render(<Scoops />);

  
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });

 
  const total = screen.getByTestId("total");

  
  expect(total).toHaveTextContent(/^0$/);

  
  await user.click(addBtns[2]);

  
  expect(total).toHaveTextContent(/^20$/);

  
  await user.dblClick(addBtns[1]);

  
  expect(total).toHaveTextContent(/^60$/);

  
  await user.click(delBtns[1]);

  
  expect(total).toHaveTextContent(/^40$/);

 a
  await user.click(delBtns[1]);

  
  expect(total).toHaveTextContent(/^20$/);

  
  await user.click(delBtns[2]);

  
  expect(total).toHaveTextContent(/^0$/);
});
