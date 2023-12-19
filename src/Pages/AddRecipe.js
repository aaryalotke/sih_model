import React, {useContext, useState} from 'react'
import recipeContext from '../context/recipies/recipeContext';

const AddRecipe = () => {

  let costPrice = 100;
  const context = useContext(recipeContext);
    const {addRecipe} = context;

    const [recipe, setRecipe] = useState({name:"",ingredient_list:[],price_list:[],quantity_list:[],cost_price:"",selling_price:"", num_of_dishes:"", is_veg:"no"});
    const [ingredientSets, setIngredientSets] = useState([{ ingredient: '', quantity: '' }]);

    const addIngredientSet = () => {
      setIngredientSets([...ingredientSets, { ingredient: '', quantity: '' }]);
    };
    const handleClick = (e)=>{
        e.preventDefault();

        let firstItemsArray = [];
        let secondItemsArray = [];
        let priceItemsArray = [];
        for (let index = 0; index < ingredientSets.length; index++) {
          firstItemsArray.push(ingredientSets[index].ingredient);
        }
        for (let index = 0; index < ingredientSets.length; index++) {
          secondItemsArray.push(ingredientSets[index].quantity);
        }
        for (let index = 0; index < ingredientSets.length; index++) {
          priceItemsArray.push(ingredientSets[index].quantity);
        }

        console.log(firstItemsArray);

        firstItemsArray.push("other");
        secondItemsArray.push(1);
        priceItemsArray.push(otherExpenses);
        costPrice = 0;
        // for (let index = 0; index < priceItemsArray.length; index++) {
        //   costPrice += priceItemsArray[index];
        // }
        const jsObj = {
          "name": recipe.name,
          "ingredient_list": firstItemsArray,
          "price_list": priceItemsArray,
          "quantity_list": secondItemsArray,
          "cost_price": costPrice,
          "selling_price": recipe.selling_price,
          "num_of_dishes": recipe.num_of_dishes,
          "is_veg": recipe.is_veg
        }
        
        setRecipe(jsObj);
        
        addRecipe(
          recipe.name,
          recipe.ingredient_list,
          recipe.price_list,
          recipe.quantity_list,
          recipe.cost_price,
          recipe.selling_price,
          recipe.num_of_dishes,
          recipe.is_veg
        );

        addRecipe(recipe.name, recipe.ingredient_list,recipe.price_list, recipe.quantity_list, recipe.cost_price,recipe.selling_price, recipe.num_of_dishes, recipe.is_veg);
        // setRecipe({name:"",ingredient_list:[],price_list:[],quantity_list:[],cost_price:"", selling_price: "", num_of_dishes:"", is_veg:""})
        addRecipe(recipe);
      }
      const [otherExpenses, setOtherExpenses] = useState(0);
    const onChange = (e)=>{

        if( e.target.name === "other-expense"){
          setOtherExpenses(e.target.value);
        }
        else{
          setRecipe({...recipe,[e.target.name]:e.target.value});
        }

    }


  
    const handleInputChange = (setIndex, key, value) => {
      const updatedIngredientSets = [...ingredientSets];
      updatedIngredientSets[setIndex][key] = value;
      setIngredientSets(updatedIngredientSets);
    };

    return (
  //     <div style={{margin: "30px", borderRadius: "40px",padding: "20px"}}>      
  //     <form style={{background:"orange", width: "400px"}}>
  // <div  className="form-group">
  //   <label htmlFor="title">Title</label>onChange
  //   <input value={recipe.name} ={onChange} id="title" name="title" type="text" className="form-control"  aria-describedby="emailHelp"  />
  // </div>
  // <div className="form-group">
  //   <label htmlFor="description">Description</label>
  //   <input value={recipe.cost_price} name ="description" onChange={onChange} type="text" className="form-control" id="description" />
  // </div>
  // <div className="form-group">
  //   <label htmlFor="tag">Tag</label>
  //   <input value={recipe.num_of_dishes} name ="tag" onChange={onChange} type="text" className="form-control" id="tag" />
  // </div>
  
  // <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Gabble</button>
  // </form></div>


  <div >
    <h1 className='text-xl text-gray-800 m-10'>

    You can add update the requirements for the recipies
    </h1>

  <div className="m-10 w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Enter the dish details</h5>
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the dish name</label>
            <input onChange={onChange} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="pav bhaji" required />
        </div>

        <div className="mt-4">
      {ingredientSets.map((ingredientSet, setIndex) => (
        <div key={setIndex} className="flex space-x-2 mb-2">
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredientSet.ingredient}
            onChange={(e) => handleInputChange(setIndex, 'ingredient', e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={ingredientSet.quantity}
            onChange={(e) => handleInputChange(setIndex, 'quantity', e.target.value)}
            className="border p-2"
          />
        </div>
      ))}
      <button onClick={addIngredientSet} className="bg-blue-500 rounded-lg text-white px-4 py-2 mt-2">
        Add Ingredients
      </button>
    </div>
    <div>
            <label htmlFor="is_veg" className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">is it veg?</label>
            <input onChange={onChange} type="checkbox" style={{margin: '10px', width: '20px', height: '20px', paddingBottom:'0'}} name="is_veg" id="is_veg"  />
        </div>
    <div>
        <label htmlFor='other-expense' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter other expenses</label>
        <input  onChange={onChange} name='other-expense' id='other-expense' type="text"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
    </div>
    <div>
        <label htmlFor='num_of_dishes' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of plates</label>
        <input  onChange={onChange} name='num_of_dishes' id='num_of_dishes' type="text"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
    </div>
    <div>
        <label htmlFor="selling_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the selling price for the dish</label>
        <input onChange={onChange} type="text" name="selling_price" id="selling_price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  required />
    </div>
    <><p  className="font-normal text-gray-700 dark:text-gray-400">Cost Price: {costPrice}</p>
</>
        <button type="submit" onClick={handleClick} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Dish</button>
    </form>
</div>
  </div>
    )
}

export default AddRecipe