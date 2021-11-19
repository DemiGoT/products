const initialState = {
    products: [],
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'PRODUCT_LOADED':
            return {
                ...state,
                products: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
