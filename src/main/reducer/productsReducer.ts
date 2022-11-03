import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import ProductsActionTypes from "../constants/actions/productsActionTypes"
import ProductsService from '../service/productsService'

export interface ProductListType{
    productList: Array<ProductType>
}

export interface ProductType{
    name: string,
    item: string
}

const initialState: ProductListType = {productList:[{name: "hello", item: "kailyn"}]}

export const fetchProductList_withPromise = createAsyncThunk(
    ProductsActionTypes.FETCH_PRODUCTS_LIST,
    async()=>{
        let productList: any = []
        
        try{
            productList = await ProductsService.fetchProductList_withPromise();
        }catch(error){
            console.log("Error getting product list form service: ", error); 
        }
        
        console.log("Returned in thunk : ", productList);
        return productList;
    }
)

export const fetchProductList_withAsyncAwait = createAsyncThunk(
    ProductsActionTypes.FETCH_PRODUCTS_LIST,
    async()=>{ 
        const productList = await ProductsService.fetchProductList_withAsyncAwait();
        console.log("Returned in thunk : ", productList);
        return productList;
    }
)


const productsSlice = createSlice({
    name: ProductsActionTypes.SET_PRODUCTS_LIST,
    initialState,
    reducers : {
        setProductList: (state, action: PayloadAction<ProductListType>) => {
            state.productList = {...action.payload.productList}
        }
    }
});

//Actions/Selector
export const selectProductList = (state: RootState) =>{
    console.log("Logging state from selctor: ", state)
    return state.products.productList
} 
export const {setProductList} = productsSlice.actions

//Reducer
export default productsSlice.reducer