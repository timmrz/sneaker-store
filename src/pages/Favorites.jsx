import { useContext } from "react";
import Card from "../components/Card/Card";
import EmptyPage from "../components/EmptyPage/EmptyPage";
import AppContext from "../context";
import styles from "./Pages.module.scss";

export default function Favorites({ onAddToFavorite, onAddToCart }) {
  const { favoritesItems } = useContext(AppContext);

  return (
    <div className={styles.content}>
      {favoritesItems.length > 0 ? (
        <div>
          <h1 className={styles.mainTitle}>My favorites</h1>
          <div className={styles.items}>
            {favoritesItems.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyPage
          title='No favorite products :('
          text="You haven't added anything to your favorites"
        />
      )}
    </div>
  );
}
