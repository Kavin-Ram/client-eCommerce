export const cartReducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }],
            };



        case "UPDATE_CART":
            return {
                ...state,
                cart: action.payload,
            };


        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: action.payload,
            };


        case 'SET_CART':
            return { ...state, cart: action.payload };

        case "INCREMENT_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };


        case "EMPTY_CART":
            return {
                ...state,
                cart: [{ ...action.payload }]
            };

        default:
            return state;
    }
};