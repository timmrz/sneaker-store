import React, { useContext } from "react";
import AppContext from "../../context";
import ButtonBack from "../ButtonBack/ButtonBack";
import styles from "./Info.module.scss";

export default function Info({ image, title, description }) {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className={styles.cartEmpty}>
      <img
        className={styles.cartImg}
        width={120}
        height={120}
        src={image}
        alt='#'
      />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{description}</p>
      <ButtonBack closeCart={() => setCartOpened(false)} />
    </div>
  );
}
