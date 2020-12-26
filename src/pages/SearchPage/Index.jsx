import React from 'react'
import { useParams} from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

import './SearchPageStyles.scss'

import RecipeItem from '../../components/RecipeItem/Index'
import search, {fetchRandomRecipe} from '../../Search'

import LoadingImg from '../../images/loading.svg'

const SearchPage = (props) => {
    let { searchContent } = useParams()

    document.title = `Search "${searchContent}"` || 'foodyou'

    const refLoading = useRef(null)

    const lastSearchContent = useRef('')
    const [searchResult, setSearchResult] = useState(null)
    const [fetched, setFetched] = useState(false)

    const fetchSearch = async() => {
        if (searchContent && searchContent !== lastSearchContent.current && !fetched) {
            lastSearchContent.current = searchContent
            search(searchContent)                
            .then(data => {
                let auxSearchResult = []
                if(data[0].meals)
                    data[0].meals.forEach(recipe => {
                        if(!auxSearchResult.includes(recipe))
                            auxSearchResult.push(recipe)
                    })
                if(data[1].meals)
                    data[1].meals.forEach(recipe => {
                        if(!auxSearchResult.includes(recipe))
                            auxSearchResult.push(recipe)
                    })

                if(data[2].meals)
                    data[2].meals.forEach(recipe => {
                        if(!auxSearchResult.includes(recipe))
                            auxSearchResult.push(recipe)
                    })
                setFetched(true)
                setSearchResult(auxSearchResult.length === 0 ? null : auxSearchResult)
            })
        }
        return false
    }

    const LoadingContainer = (_props) => {
        return (
        <div ref={refLoading} className="loading_container">
            <img src={LoadingImg} className="icon loading_img" alt="Loading..."/>
        </div>
    )}

    const LoadSearchResult = () => {
        return(
            <div id="search_main_container">
                {
                    fetched && searchResult ? 
                    searchResult.map( (recipe, i) => 
                        <RecipeItem 
                        key={i}
                        recipe={recipe}/>
                    ) : ``
                }
            </div>
        )
    }

    // Random recipe fields
    const randomRecipe = useRef(null)
    const [fetchedRandomRecipe, setFetchedRandomRecipe ] = useState(null)

    const NoRecipesFound = (_props) =>{
        // Show a "no recipes message" and a random recipe suggestion

        const getARandomRecipe = async() => {
            if(fetchedRandomRecipe) return null
            await fetchRandomRecipe()
            .then(data => {
                randomRecipe.current = data.meals[0]
                setFetchedRandomRecipe(true)
            })
        }

        useEffect( ()=>{
            if(!fetchedRandomRecipe)
                getARandomRecipe()
        } )

        return(
            <div id="no_results_container">
                <div>
                    <p id="no_results__title">No recipes found for "{searchContent}"</p>
                    <p id="no_results__recommendation">But what about this one?</p>
                    {
                        randomRecipe.current ? 
                        <RecipeItem
                        recipe={randomRecipe.current}/> : ``
                    }    
                </div>            
            </div>
        )
    }

    // Turns fetched false if the user make a new search without leaving search page
    if(fetched && searchContent !== lastSearchContent.current)
        setFetched(false)

    useEffect(()=>{
        if(!fetched)
            fetchSearch()

        if(fetched)
            refLoading.current.classList.add('hide_loading_container')
        else
            refLoading.current.classList.remove('hide_loading_container')
    })

    return (
        <div id="search_container">            
            <p id="results_heading_title" className="title">Results for "{searchContent}"</p>
            <LoadingContainer/>
            {
                fetched && searchResult ? <LoadSearchResult/> : ``
            }
            {
                fetched && !searchResult ? 
                <NoRecipesFound/> : ``
            }
        </div>
    )
}

export default SearchPage
