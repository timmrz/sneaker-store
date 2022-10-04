import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context";
import CartIcon from "../icons/CartIcon";
import HeaderHeartIcon from "../icons/HeaderHeartIcon";
import UserIcon from "../icons/UserIcon";
import styles from "./Header.module.scss";

export default function Header(props) {
  const { cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logoBlock}>
          <img width={40} height={40} src='img/logo.png' alt='#' />
          <div>
            <h3 className={styles.logoTitle}>Sneakers Store</h3>
            <p className={styles.logoText}>Shop the best sneakers</p>
          </div>
        </div>
      </Link>

      <ul className={styles.headerList}>
        <li onClick={props.onClickCart} className={styles.cart}>
          <CartIcon />

          <span>{totalPrice} $</span>
        </li>
        <li className={styles.heart}>
          <Link to='/favorites'>
            <HeaderHeartIcon />
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <UserIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
