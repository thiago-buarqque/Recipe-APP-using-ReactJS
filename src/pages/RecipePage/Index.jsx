import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useState, useRef} from 'react'

import './RecipePageStyles.scss'

import {fetchRecipe} from '../../Search'

import LoadingImg from '../../images/loading.svg'

const RecipePage = (props) => {
    const {recipe} = useParams()

    const result = useRef(null)
    const [fetched, setFetched] = useState(false)

    const refLoading = useRef(null)

    let resultIngredients = []
    let [resultTags, setResultTags] = useState(undefined)

    if(fetched && result.current){
         // Get and formate result tags
         let auxResultTags = result.current.strArea
         if(result.current.strTags){
             let auxTags = result.current.strTags.split(',')
             auxResultTags = result.current.strArea + ' - '
             auxTags.forEach( (tag, i) => {
                 auxResultTags += (i !== auxTags.length - 1) ? tag + ', ' : tag
             })             
         }
         if(!resultTags)
            setResultTags(auxResultTags)

        let auxIngredients = []
        let counter = 0

        for (const [key, value] of Object.entries(result.current)) {
            if(key.includes('strIngredient') && value !== '' && value !== ' ' && value)
                auxIngredients.push(value)
            if(key.includes('strMeasure') &&                
                 value !== '' &&
                 value !== ' ' &&
                 value !== null){
                resultIngredients.push({ingredient: auxIngredients[counter], measure: value})
                counter += 1
            }
        }       
    }

    const getRecipe = async () => {
        await fetchRecipe(recipe)
        .then( data => {

            if(data.meals)            
                result.current = data.meals[0]
            setFetched(true)            
        })
    }

    const LoadingContainer = (_props) => {
        return (
        <div ref={refLoading} className="loading_container">
            <img src={LoadingImg} className="icon loading_img"/>
        </div>
    )}

    const RecipeContainer = (_props) => {
        return (
            <div id="recipe_page__recipe_container">
                <p id="recipe_name" className="title">{result.current.strMeal}</p>
                <div id="recipe_page__recipe_thumb">
                    <img src={result.current.strMealThumb} alt={result.current.strMeal} title={result.current.strMeal}/>
                </div>
                <div id="recipe_page__recipe_ingredients">
                    <p className="recipe_sec_title title">Ingredients</p>
                    <div id="recipes_ingredients__container">
                        {
                            resultIngredients.map( (obj, i) => 
                                <p key={i} className="recipe_ingredient">
                                    <span>{obj.ingredient}</span> ({obj.measure})
                                </p>
                            )
                        }
                    </div>                    
                </div>
                <div id="recipe_page__recipe_instructions">
                    <p className="recipe_sec_title title">Instructions</p>
                    <p id="recipe_strInstructions">{result.current.strInstructions}</p>                    
                </div>
                <div id="recipe_page__recipe_tags">
                    {
                        result.current.strYoutube ? 
                        <p id="str_help">Need help? See the <a href={result.current.strYoutube} target="_blank" id="link_recipe_video" className="remove_user_select">recipe video</a></p>
                        : ``
                    }                    
                    {         
                        resultTags ? 
                        <p id="str_tags">{resultTags}</p> : ``
                    }
                </div>
            </div>
        )
    }

    useEffect( () => {
        if(!fetched)
            getRecipe()

        if(fetched)
            refLoading.current.classList.add('hide_loading_container')
        else
            refLoading.current.classList.remove('hide_loading_container')
    })

    return(
        <div id="recipe_page__container">
            <div id="recipe_page__content">
                <LoadingContainer/>
                {
                    fetched && result.current ? 
                    <RecipeContainer/> : ``
                }
                {
                    fetched && !result.current ?
                    <p id="str_recipe_not_found">Recipe not found</p> : ``
                }
            </div>
        </div>
    )
}

export default RecipePage