import Card from "../components/Card/Card";
import ButtonDeleteIcon from "../components/icons/ButtonDeleteIcon";
import SearchIcon from "../components/icons/SearchIcon";
import styles from "./Pages.module.scss";

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        {...item}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ));
  };
  return (
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <h1 className={styles.mainTitle}>
          {searchValue ? `Search by request: "${searchValue}"` : "All sneakers"}
        </h1>
        <div className={styles.searchBlock}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            value={searchValue}
            onChange={onChangeSearchInput}
            type='text'
            placeholder='Search'
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className={styles.buttonClear}>
              <ButtonDeleteIcon />
            </button>
          )}
        </div>
      </div>

      <div className={styles.items}>{renderItems()}</div>
    </div>
  );
}
