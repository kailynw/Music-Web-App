import axios from "axios"
import { ProductsEndpoints } from "../constants/endpoints/productsEndpoints"

const ProductsService = {
    fetchProductList_withAsyncAwait: async() => {
        let productList: any = []

        try{
            const productListResponse = await axios.get(ProductsEndpoints.FETCH_PRODUCT_LIST_URL)
            console.log("Product List Response: ", productListResponse)
            productList = productListResponse.data
        }catch(error){
            console.error(`An error occurred when calling: ${ProductsEndpoints.FETCH_PRODUCT_LIST_URL} | Error: ${error}`)
        }

        return productList;
    },
    fetchProductList_withPromise: ()=>{
        return new Promise((resolve, reject)=>{
            
            axios.get(ProductsEndpoints.FETCH_PRODUCT_LIST_URL)
            .then((productListResponse)=>{
                console.log("Product List response: ", productListResponse)
                let productList: any = productListResponse.data
                resolve(productList);
            })
            .catch((error)=>{
                console.error(`An error occurred when calling: ${ProductsEndpoints.FETCH_PRODUCT_LIST_URL} | Error: ${error}`)
                reject(error);
            })
            
        })
    }
}

export default ProductsService;

    