import { screen, render } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";


const item = {
  name: "Chocolate",
  imagePath: "/images/chocolate.png",
  id: "358a",
};


const basket = [
  {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "358a",
    amount: 3,
  },
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
    id: "50cf",
    amount: 1,
  },
];


const otherBasket = [
  {
    name: "Vanilla",
    imagePath: "/images/vanilla.png",
    id: "50cf",
    amount: 3,
  },
];


test("Miktar, başlık, fotoğraf gelen propa göre ekrana basılır", () => {
  render(
    <Card
      item={item}
      addToBasket={() => {}}
      removeFromBasket={() => {}}
      basket={basket}
    />
  );

  
  const amount = screen.getByTestId("amount");

  
  expect(amount).toHaveTextContent(/^3$/);

  screen.getByText("Chocolate");

  
  const img = screen.getByAltText("çeşit-resim");

  expect(img).toHaveAttribute("src", "/images/chocolate.png");
});

test("Butonlara tıklanınca fonksiyonlar doğru parametreler ile çalışır", async () => {
  const user = userEvent.setup();

  const addMockFn = jest.fn();
  const removeMockFn = jest.fn();

  
  render(
    <Card
      item={item}
      basket={basket}
      addToBasket={addMockFn}
      removeFromBasket={removeMockFn}
    />
  );

  
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const delBtn = screen.getByRole("button", { name: /azalt/i });

  
  await user.click(addBtn);

  expect(addMockFn).toHaveBeenCalledWith(item);

  await user.click(delBtn);

  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

describe("azalt butonunun aktiflik testleri", () => {
  it("sepette aynı item'dan varsa buton aktiftir", () => {
    render(<Card item={item} basket={basket} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeEnabled();
  });

  it("sepette aynı item'dan yoksa buton inaktiftir", () => {
    render(<Card item={item} basket={otherBasket} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeDisabled();
  });
});
