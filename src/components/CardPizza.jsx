import React from 'react';

const CardPizza = ({ name, img, desc, ingredients, price, onAddToCart }) => {
  return (
    <div className="card mb-4">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body text-center">
        <h5 className="card-title">
            <strong>{`Pizza ${name}`}</strong>
          </h5>
        <p className="card-text">{desc}</p>
        <hr />
        <p><strong>Ingredientes:</strong></p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <hr />
        
        <p className="card-price"><strong>Precio: ${price.toLocaleString('es-CL')}</strong></p>
       
        <button className="btn btn-dark btn-sm" onClick={onAddToCart}>
          Añadir 🛒
        </button>
      </div>
    </div>
  );
};

export default CardPizza;
