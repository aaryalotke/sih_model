import React, {useContext,useEffect,useRef,useState} from 'react'
import recipeContext from '../context/recipies/recipeContext';
import DishCard from './DishCard';
import {  useNavigate } from 'react-router-dom';
import AddRecipe from './AddRecipe';


const RestaurantManagerPage = () => {
  const context = useContext(recipeContext);
  const {recipies,getRecipies, editRecipe} = context;
  let navigate = useNavigate();
  useEffect(()=>{
      getRecipies();
      // console.log(localStorage.getItem('token'));
    
    // eslint-disable-next-line
  },[]);
  const ref = useRef(null);

  const updateRecipe = (currentRecipe)=>{
    ref.current.click();
    setRecipe({id : currentRecipe._id, ename: currentRecipe.name, eingredient_list: currentRecipe.ingredient_list, eprice_list: currentRecipe.price_list,equantity_list: currentRecipe.quantity_list,ecost_price:currentRecipe.cost_price,enum_of_dishes: currentRecipe.num_of_dishes});
  }

  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({id:"",ename:"",eingredient_list:[],eprice_list: [], equantity_list: [], ecost_price: "", enum_of_dishes: ""});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (e)=>{

    console.log("updating the note");
    editRecipe(recipe.id, recipe.ename, recipe.eingredient_list,recipe.eprice_list, recipe.equantity_list,recipe.ecost_price, recipe.enum_of_dishes);
    setShow(false);
    // addNote(recipe.title, note.description,note.tag);
}
const onChange = (e)=>{
    setRecipe({...recipe,[e.target.name]:e.target.value});
}


  return (
    <div className="bg-white min-h-screen rounded-lg ">

    <div className='row'>
    <AddRecipe className='col-sm'/>
   
    <h2 className='my-3 ml-2 font-bold text-2xl'>List of recipies</h2>
    <div style={{width: '18rem', display: "flex"}} className='row-sm'>
        <div  className="container row-sm">
        {recipies.length===0 && 'no recipies to display'}
        </div>
    {recipies.map((recipe, addRecipe)=>{
      console.log("homepage" ,recipe)
        return <DishCard style={{width: '18rem'}} key={recipe._id} updateRecipe={updateRecipe} recipe={recipe}/>
    })}</div>
    </div>
    </div>
  )
}

export default RestaurantManagerPage