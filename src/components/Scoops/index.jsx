import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [basket, setBasket] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4060/scoops")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToBasket = (item) => {
   
    const found = basket.find((i) => i.id === item.id);

    if (found) {
     
      const updated = { ...found, amount: found.amount + 1 };

     
      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      
      setBasket(temp);
    } else {
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };

  const removeFromBasket = (id) => {
   
    const found = basket.find((i) => i.id === id);

    if (found.amount > 1) {
      
      const updated = { ...found, amount: found.amount - 1 };

      
      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      
      setBasket(temp);
    } else {
     
      setBasket(basket.filter((i) => i.id !== id));
    }
  };

 
  const total = basket.reduce((total, i) => total + i.amount * 20, 0);

  console.log(basket);

  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>

      <p>
        Tanesi <span className="text-success">20</span>₺
      </p>

      <h3>
        Çeşitler Ücreti{" "}
        <span data-testid="total" className="text-success">
          {total}
        </span>
        ₺
      </h3>

      <div className="p-3 row gap-5 mt-4 justify-content-between">
        {data.map((i) => (
          <Card
            item={i}
            key={i.id}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            basket={basket}
          />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
