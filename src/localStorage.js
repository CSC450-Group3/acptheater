//https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

/**
 * Load the current state from localStorage
 */
export const loadState = () =>{
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState)
    }
    catch(err){
        return undefined;
    }
}

/**
 *  Save current state into localStorage
 */
export const saveState = (state) =>{
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err){
        console.log(err);
    }
}