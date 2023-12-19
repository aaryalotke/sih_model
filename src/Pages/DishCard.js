import React,{useContext} from 'react'
import recipeContext from '../context/recipies/recipeContext';
const DishCard = (props) => {

    const context = useContext(recipeContext);
    const {deleteRecipe} = context;
   

    const {recipe,updateRecipe} = props;
  return (
    <div>
        <div className="card mx-2" style={{ width: "18rem", marginBottom: '10px' }}>
  <div className="card-body">
    <div className='d-flex align-items-center'>
    <h5 style={{fontWeight: "bold"}} className="card-title">{recipe.name}</h5>
    <ul className="list-group list-group-flush">
  {
    (() => {
      const listItems = [];
      console.log("finally",recipe);
      for (let i = 0; i < recipe.ingredient_list.length; i++) {
        listItems.push(
          <li style={{fontStyle: "italic"}} key={i} className="list-group-item">
            {recipe.ingredient_list[i] + " : "+ recipe.quantity_list[i] + " kg"}
          </li>
        );
      }
      return listItems;
    })()
  }
</ul>
   
    <button className="mx-2 fa-solid fa-arrow-up" onClick={()=>{deleteRecipe(recipe._id)}} />
    <button className="mx-2 fa-solid fa-arrow-down" onClick={()=>{updateRecipe(recipe)}}/></div>
    <p className="card-text">{"serves: "+recipe.num_of_dishes+" people"}</p>
    
  </div>
</div>
    </div>
  )
}

export default DishCard