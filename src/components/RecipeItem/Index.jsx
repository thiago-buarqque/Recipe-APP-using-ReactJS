import React from 'react'

import './RecipeItemStyles.scss'

const RecipeItem = (props) =>{
    let recipe = props.recipe

    let strTags = recipe.strArea
    if(recipe.strTags){
        let tags = recipe.strTags.split(',')       
        strTags += ' - ' 
        if(tags.length > 0)
            tags.forEach( (tag, i) => { strTags += (i === 0 ? "" : ", ") + tag })
        else if(tags.length === 0)
            strTags = tags[0]
    }

    return( 
        <div className="recipe_item">
            <div className="recipe_item__image_container">
                <a href={`/r/${recipe.strMeal.toLowerCase()}`} className="recipe_item_link">
                    <img 
                    src={recipe.strMealThumb} 
                    className="recipe_item__image"
                    alt={recipe.strMeal.toLowerCase()} 
                    title={recipe.strMeal}/>
                </a>
            </div>
            <div className="recipe_item__info_container">            
                <a href={`/r/${recipe.strMeal.toLowerCase()}`} className="recipe_item__title">
                    {recipe.strMeal}
                </a>                
                <div className="recipe_item__tags_container">
                    <p>{strTags}</p>
                </div>
            </div>
        </div>
    )
}

export default RecipeItem