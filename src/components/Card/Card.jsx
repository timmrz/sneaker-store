import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import { useState } from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import ButtonCheckedIcon from "../icons/ButtonCheckedIcon";
import ButtonPlusIcon from "../icons/ButtonPlusIcon";
import HeartIcon from "../icons/HeartIcon";
import LikedIcon from "../icons/LikedIcon";

export default function Card({
  onFavorite,
  onPlus,
  title,
  price,
  imgUrl,
  id,
  item_id,
  favorited = false,
  loading = false,
}) {
  const [isFavorite, setIsFavorite] = useState(favorited);
  const { isItemAdded } = useContext(AppContext);
  const { isItemFavorite } = useContext(AppContext);
  const [buttonAddLoading, setButtonAddLoading] = useState(false);
  const [buttonFavLoading, setButtonFavLoading] = useState(false);

  const onClickPlus = async () => {
    setButtonAddLoading(true);
    await onPlus({ title, price, imgUrl, id, item_id });
    setButtonAddLoading(false);
  };

  const onClickFavorite = async () => {
    setButtonFavLoading(true);
    await onFavorite({ id, title, price, imgUrl, item_id });
    setIsFavorite(!isFavorite);
    setButtonFavLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className={styles.card}>
          <ContentLoader
            speed={3}
            width='100%'
            height='100%'
            viewBox='0 0 150 218'
            backgroundColor='#F2F2F2'
            foregroundColor='#ecebeb'>
            <rect x='0' y='0' rx='10' ry='10' width='150' height='110' />
            <rect x='0' y='124' rx='3' ry='3' width='150' height='34' />
            <rect x='0' y='170' rx='3' ry='3' width='93' height='15' />
            <rect x='0' y='193' rx='8' ry='8' width='80' height='18' />
            <rect x='115' y='176' rx='8' ry='8' width='35' height='35' />
          </ContentLoader>
        </div>
      ) : (
        <div className={styles.card}>
          {onFavorite && (
            <div onClick={onClickFavorite} className={styles.favorite}>
              {buttonFavLoading ? (
                <div className={styles.spinner}></div>
              ) : isItemFavorite(item_id) ? (
                <LikedIcon />
              ) : (
                <HeartIcon className={styles.heartIcon} />
              )}
            </div>
          )}
          <img className={styles.itemImg} src={imgUrl} alt='' />
          <h5 className={styles.cardTitle}>{title}</h5>

          <div className={styles.cardBottom}>
            <div className={styles.price}>
              <span>Price</span>
              <b>{price} $ </b>
            </div>
            {onPlus && (
              <button
                onClick={onClickPlus}
                className={styles.button}
                style={{
                  border: isItemAdded(item_id) ? "none" : "1px solid #BBBBBB",
                }}>
                {buttonAddLoading ? (
                  <div className={styles.spinner}></div>
                ) : isItemAdded(item_id) ? (
                  <ButtonCheckedIcon />
                ) : (
                  <ButtonPlusIcon className={styles.plusIcon} />
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
