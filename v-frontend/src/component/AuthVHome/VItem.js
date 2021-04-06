import React, { Component } from 'react'

const VItem = props => {
    const { name, image, ingredients } = props;
    return (
        <div class="card py-2 text-center">
            <img src={image} className="img-fluid w-50 mx-auto rounded-circle"/>
            <div class="card-body">
        <h5>{name}</h5>
        </div>
        <ul class="list-group list-group-flush">
        {ingredients.map(ingredient => (
        <li className="list-group-item">{ingredient}</li>
        ))}
        </ul>
        </div>
    )
}
export default VItem;
