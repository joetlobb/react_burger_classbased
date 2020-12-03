import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];
  // console.log(props.ingredients);
  for (let igName in props.ingredients) {
    ingredients.push({
      name: igName, //access key
      amount: props.ingredients[igName] // access value
    })
  }
  console.log(ingredients);

  const ingredientsOutput = ingredients.map(ig => {
    return <span key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px 9px'
      }} >{ig.name} ({ig.amount})</span>;
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order;