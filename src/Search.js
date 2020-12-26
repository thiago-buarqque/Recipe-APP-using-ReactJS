const search = async (data) => {
    // Any fetch returns a Object{meals: content} even if nothing is found or it gives an error
    return [
        await fetchRecipe(data),
        await fetchRecipeByMainIngredient(data),
        await fetchRecipeByNationality(data)
    ]
}

export const fetchRecipe = async (data) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`)
        return await response.json()
    }catch(error){
        return {meals: null}
    }
}

const fetchRecipeByMainIngredient = async (data) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`)
        let recipes = await response.json()

        if(recipes.meals){
            let result = []
            for(let i = 0; i < recipes.meals.length; i += 1){
                let data = await fetchRecipeById(recipes.meals[i].idMeal)
                if(data.meals) result.push(data.meals[0])
            }
            return {meals: result}
        }
        return recipes
    }catch(error){
        return {meals: null}
    }
}

const fetchRecipeByNationality = async (data) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`)
        let nationalRecipes = await response.json()   

        if(nationalRecipes.meals){
            let result = []
            for(let i = 0; i < nationalRecipes.meals.length; i += 1){
                let data = await fetchRecipeById(nationalRecipes.meals[i].idMeal)
                if(data.meals) result.push(data.meals[0])
            }
            return {meals: result}
        }
        return nationalRecipes
    }catch(error){
        return {meals: null}
    }
}

export const fetchRandomRecipe = async (id) => {
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        return await response.json()
    }catch(error){
        return {meals: null}
    }
}

export const fetchRecipeById = async (id) => {
    const fetchRecipe = async () => {
        try{
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            return await response.json()
        }catch(error){
            return {meals: null}
        }
    }
    return await fetchRecipe()
}

export default search