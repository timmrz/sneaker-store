import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";



function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoritesItems, setFavoritesItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([]);


  useEffect(() => {

    async function fetchData() {

      try {
        setIsLoading(true)

        const [cartResponse, favoritesResponse, itemsResponse, ordersResponse] = await Promise.all([
          axios.get("https://631e734422cefb1edc3501f0.mockapi.io/cart"),
          axios.get("https://631e734422cefb1edc3501f0.mockapi.io/favorites"),
          axios.get("https://631e734422cefb1edc3501f0.mockapi.io/items"),
          axios.get("https://631e734422cefb1edc3501f0.mockapi.io/orders")
        ])


        setFavoritesItems(favoritesResponse.data)
        setCartItems(cartResponse.data)
        setItems(itemsResponse.data)
        setOrders(ordersResponse.data)

        setIsLoading(false)

      } catch {
        alert('Error loading goods')
      }
    }

    fetchData();

  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => item.item_id === obj.item_id)) {

        const deletedItem = cartItems.find((item) => item.item_id === obj.item_id)

        await onRemoveItem(deletedItem)
      } else {

        const { data } = await axios.post("https://631e734422cefb1edc3501f0.mockapi.io/cart", obj)

        setCartItems((prev) => [...prev, data])

      }
    } catch {
      alert('Failed to add item to cart')
    }
  }

  const onRemoveItem = async (obj) => {
    try {
      await axios.delete(`https://631e734422cefb1edc3501f0.mockapi.io/cart/${ obj.id }`)

      setCartItems((prev) => prev.filter((item) => item.item_id !== obj.item_id))

    } catch {
      alert('error when you delete from cart')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {

      if (favoritesItems.find((favObj) => favObj.item_id === obj.item_id)) {

        const deletedItem = favoritesItems.find((favObj) => favObj.item_id === obj.item_id)

        await axios.delete(`https://631e734422cefb1edc3501f0.mockapi.io/favorites/${ deletedItem.id }`)

        setFavoritesItems((prev) => prev.filter((item) => item.item_id !== deletedItem.item_id))

      } else {
        const { data } = await axios.post("https://631e734422cefb1edc3501f0.mockapi.io/favorites", obj)

        setFavoritesItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Failed to add to favorites')
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (item_id) => {
    return cartItems.some((obj) => obj.item_id === item_id)
  }

  const isItemFavorite = (item_id) => {
    return favoritesItems.some((obj) => obj.item_id === item_id)
  }


  return (
    <AppContext.Provider value={{ items, cartItems, favoritesItems, isItemAdded, setCartOpened, setCartItems, isItemFavorite, orders, setOrders }}>
      <div className='wrapper'>

        <Drawer items={cartItems} onClickClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>

          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}

              />
            }>
          </Route>

          <Route
            path="/favorites"
            exact
            element={
              <Favorites
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            }>
          </Route>

          <Route
            path="/orders"
            exact
            element={
              <Orders
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            }>
          </Route>

        </Routes>


      </div>

    </AppContext.Provider>
  );
}

export default App;
