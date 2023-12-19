import React, { useContext } from 'react';
import recipeContext from '../context/recipies/recipeContext';

const DishCard = (props) => {
  const context = useContext(recipeContext);
  const { deleteRecipe, updateRecipe } = context;

  const { recipe } = props;

  return (
    <div>
      <div className="card mx-2" style={{ width: "18rem", marginBottom: '10px' }}>
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 style={{ fontWeight: "bold" }} className="card-title">{recipe.name}</h5>
            <ul className="list-group list-group-flush">
              {
                recipe && recipe.ingredient_list && recipe.quantity_list && recipe.ingredient_list.length && recipe.quantity_list.length
                  ? recipe.ingredient_list.map((ingredient, index) => (
                    <li style={{ fontStyle: "italic" }} key={index} className="list-group-item">
                      {`${ingredient} : ${recipe.quantity_list[index]} kg`}
                    </li>
                  ))
                  : null
              }
            </ul>
            <button className="mx-2 fa-solid fa-arrow-up" onClick={() => { deleteRecipe(recipe._id) }} />
            <button className="mx-2 fa-solid fa-arrow-down" onClick={() => { updateRecipe(recipe) }} /></div>
          <p className="card-text">{"serves: " + recipe.num_of_dishes + " people"}</p>
        </div>
      </div>
    </div>
  );
}

export default DishCard;