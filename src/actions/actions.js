const productLoaded = (newProduct) => {
    return {
        type: 'PRODUCT_LOADED',
        payload: newProduct
    };
};

export {
    productLoaded,
};
