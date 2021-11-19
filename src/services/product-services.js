import axios from "axios"

export default class ProductService {

    getProducts() {
        const res = axios('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e', {
            method: 'GET',
            headers: {
                mode: 'no-cors',
            }
        })
        
        return res;
    };

}
