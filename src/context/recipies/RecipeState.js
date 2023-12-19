// import noteContext from "./noteContext";
import recipeContext from "./recipeContext";
import { useState } from "react";
const RecipeState = (props) => {
  // const host= "http://localhost:5000" ;
  const host = "http://localhost:5000/fir-crud-restapi-8f473/us-central1/app";
  const recipiesInitial = [];

  const [recipies, setRecipies] = useState(recipiesInitial);

  //get all notes
  const getRecipies = async () => {
    // console.log('adding a new note');
    const response = await fetch(`${host}/api/get-recipies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("from api", json);
    setRecipies(json);
  };

  // Add a note
  const addRecipe = async (
    name,
    ingredient_list,
    price_list,
    quantity_list,
    cost_price,
    selling_price,
    num_of_dishes
  ) => {
    console.log("Name:", name);
    console.log("List of Ingredients:", ingredient_list);
    console.log("Price List:", price_list);
    console.log("Quantity List:", quantity_list);
    console.log("Cost Price:", cost_price);
    console.log("Selling Price:", selling_price);
    console.log("Number of Dishes:", num_of_dishes);
    const response = await fetch(`${host}/api/add-recipe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        ingredient_list,
        price_list,
        quantity_list,
        cost_price,
        selling_price,
        num_of_dishes,
      }),
    });
    const recipe = await response.json();
    setRecipies(recipies.concat(recipe));
  };

  // Delete a note
  const deleteRecipe = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();

    console.log("deleting the note ", id);
    const newRecipies = recipies.filter((recipe) => {
      return recipe._id !== id;
    });
    setRecipies(newRecipies);
  };

  // Edit a note
  let newRecipies = JSON.parse(JSON.stringify(recipies));
  const editRecipe = async (
    id,
    name,
    list_of_ingredient,
    price_list,
    quantity_list,
    num_of_dishes
  ) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        list_of_ingredient,
        price_list,
        quantity_list,
        num_of_dishes,
      }),
    });
    const json = await response.json();
    console.log(json);

    for (let index = 0; index < newRecipies.length; index++) {
      const element = newRecipies[index];
      if (element._id === id) {
        newRecipies[index].name = name;
        newRecipies[index].list_of_ingredient = list_of_ingredient;
        newRecipies[index].price_list = price_list;
        newRecipies[index].quantity_list = quantity_list;
        newRecipies[index].num_of_dishes = num_of_dishes;
        break;
      }
    }
    setRecipies(newRecipies);
  };

  return (
    <recipeContext.Provider
      value={{ recipies, addRecipe, deleteRecipe, editRecipe, getRecipies }}
    >
      {props.children}
    </recipeContext.Provider>
  );
};

export default RecipeState;
