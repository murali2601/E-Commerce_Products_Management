import {createSlice} from "@reduxjs/toolkit"

const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);
        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
        return [];
    }
};

const cartSlice = createSlice({
    name : "cart",
    initialState : loadCartFromStorage(),
    reducers : {
        addItem(state, action){
            // console.log(action)
            state.push(action.payload);
            localStorage.setItem('cart',JSON.stringify([...state])); 
        },
        removeItem(state, action){

            let updatedCart = state.filter((cartProduct) => cartProduct.id !== action.payload);
            localStorage.setItem('cart',JSON.stringify([...updatedCart]));
            return updatedCart;

        }
    } 
})

export default cartSlice.reducer;

export let { addItem, removeItem } = cartSlice.actions;
