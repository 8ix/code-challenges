/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

export function cookingStatus(timeRemaining){
    switch(true){
        case timeRemaining === 0:
            return 'Lasagna is done.';
            break;
        case timeRemaining > 0:
            return 'Not done, please wait.';
            break
        default:
            return 'You forgot to set the timer.';
    }   
}

export function preparationTime(layers, prepTime = 2){
    return layers.length * prepTime;
}

export function quantities(ingredients){

    let recipe = {'noodles' : 0,'sauce' : 0}

    for(let i = 0; i < ingredients.length; i++){
        switch(ingredients[i]){
            case 'noodles':
                recipe.noodles += 50;
                break;
            case 'sauce':
                recipe.sauce += 0.2;
                break; 
        }
    }
    return recipe;
}

export function addSecretIngredient(friendsList, myList){
    myList.push(friendsList[friendsList.length-1]);
    console.log(myList);
}

export function scaleRecipe(recipe, portions){

    let amendedRecipe = {...recipe};

    for(let key in recipe){
        amendedRecipe[key] *= portions/2;
    }
    return amendedRecipe;
}