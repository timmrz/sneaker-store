import React from "react";
import ButtonBack from "../ButtonBack/ButtonBack";
import { Link } from "react-router-dom";
import styles from "./EmptyPage.module.scss";

export default function EmptyPage(props) {
  return (
    <div className={styles.content}>
      <img className={styles.img} src='/img/smile.jpg' alt='#' />
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.text}>{props.text}</p>
      <Link to='/'>
        <ButtonBack className={styles.button} />
      </Link>
    </div>
  );
}
