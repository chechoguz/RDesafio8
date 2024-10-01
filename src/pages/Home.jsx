import React, { useEffect, useState, useContext } from 'react';
import CardPizza from '../components/CardPizza';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="col-md-4 mb-4">
            <CardPizza 
              name={pizza.name}
              img={pizza.img}
              desc={pizza.desc}
              ingredients={pizza.ingredients}
              price={pizza.price}
              onAddToCart={() => addToCart(pizza)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
