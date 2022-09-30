import React from "react";
import ArrowIcon from "../icons/ArrowIcon";
import styles from "./ButtonBack.module.scss";

export default function ButtonBack(props) {
  return (
    <button onClick={props.closeCart} className={styles.greenButton}>
      Go back
      <ArrowIcon />
    </button>
  );
}
