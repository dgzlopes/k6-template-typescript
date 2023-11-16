export interface RecommendationRequest {
    maxCaloriesPerSlice: number,
    mustBeVegetarian: boolean,
    excludedIngredients: string[],
    excludedTools: string[],
    maxNumberOfToppings: number,
    minNumberOfToppings: number
}

export interface RecommendationResponse {
    pizza: Pizza,
    calories: number,
    vegetarian: boolean
}

export interface Pizza {
    name: string,
    dough: Dough,
    ingredients: Ingredient[],
    tool: string
}

export interface Dough {
    name: string,
    caloriesPerSlice: number
}