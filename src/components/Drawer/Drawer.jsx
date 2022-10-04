import { useContext, useRef, useState } from "react";
import Info from "../Info/Info";
import AppContext from "../../context";
import axios from "axios";
import ArrowIcon from "../icons/ArrowIcon";
import ButtonDeleteIcon from "../icons/ButtonDeleteIcon";
import styles from "./Drawer.module.scss";

export default function Drawer({ onClickClose, items = [], onRemove, opened }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { cartItems, setCartItems } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const { setOrders } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://631e734422cefb1edc3501f0.mockapi.io/orders",
        { items: cartItems }
      );
      setOrders((prev) => [...prev, data]);
      setOrderId(data.id);
      setIsOrderComplete(true);
      cartItems.forEach((item) => {
        axios.delete(
          `https://631e734422cefb1edc3501f0.mockapi.io/cart/${item.id}`
        );
      });
      setCartItems([]);
    } catch {
      alert("Error in order creation :(");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
      onClick={(event) => {
        if (!ref.current.contains(event.target)) {
          onClickClose();
        }
      }}>
      <div ref={ref} className={styles.drawer}>
        <h2 className={styles.drawerTitle}>
          Shopping cart
          <button onClick={onClickClose}>
            <ButtonDeleteIcon />
          </button>
        </h2>
        {items.length > 0 ? (
          <div className={styles.cartBlock}>
            <div className={styles.items}>
              {items.map((obj) => {
                return (
                  <div key={obj.id} className={styles.cartItem}>
                    <img
                      className={styles.itemImg}
                      width={85}
                      height={85}
                      src={obj.imgUrl}
                      alt='sneakers'
                    />
                    <div className={styles.itemPrice}>
                      <p>{obj.title}</p>
                      <b>{obj.price}$</b>
                    </div>
                    <button onClick={() => onRemove(obj)}>
                      <ButtonDeleteIcon />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Total</span>
                  <div></div>
                  <b>{totalPrice} $ </b>
                </li>
                <li>
                  <span>Tax 5%: </span>
                  <div></div>
                  <b>{(totalPrice * 5) / 100} $ </b>
                </li>
              </ul>
              <button
                onClick={onClickOrder}
                className={styles.greenButton}
                disabled={isLoading}>
                Make an order
                <ArrowIcon />
              </button>
            </div>
          </div>
        ) : (
          <Info
            o
            title={
              isOrderComplete
                ? "Order complete!"
                : "Your shopping cart is empty"
            }
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be handed over to courier delivery`
                : "Add at least one pair of sneakers to order."
            }
            image={
              isOrderComplete ? "img/order-complete.jpg" : "img/cart-empty.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
