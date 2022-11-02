import React, { useState } from "react";
import ButtonDeleteIcon from "../icons/ButtonDeleteIcon";
import styles from "./CartItem.module.scss";

export default function CartItem({ obj, onRemove }) {
  const [buttonDeleteLoading, setButtonDeleteLoading] = useState(false);

  const onClickDelete = async (obj) => {
    setButtonDeleteLoading(true);
    await onRemove(obj);
    setButtonDeleteLoading(false);
  };

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
      <button onClick={() => onClickDelete(obj)}>
        {buttonDeleteLoading ? (
          <div className={styles.spinner} />
        ) : (
          <ButtonDeleteIcon />
        )}
      </button>
    </div>
  );
}
