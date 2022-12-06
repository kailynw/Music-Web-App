import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ProductListType, ProductType } from '../reducer/productsReducer'
import {
    selectProductList,
    setProductList,
    fetchProductList_withPromise,
    fetchProductList_withAsyncAwait,

} from '../reducer/productsReducer'

const Products = () => {
    const productsList = useAppSelector(selectProductList)
    const dispatch = useAppDispatch()
    const initialProductList: ProductListType = { productList: [{ name: "intialName", item: "soap" }] }
    // const [products, setProducts] = useState({})
    const setNewProductList: ProductListType = { productList: [{ name: "James", item: "Katchup" }] }

    return (
        <div>
            <div> {`Set products static: ${JSON.stringify(productsList)}`} </div>
            <button onClick={() => dispatch(fetchProductList_withPromise())}> Fetch products button with promise</button>
            <button onClick={() => dispatch(fetchProductList_withAsyncAwait())}> Fetch products button with async</button>

            <button onClick={() => dispatch(setProductList(setNewProductList))}>Set products button</button>

        </div>
    )
}


export default Products;