import { useContext } from "react";
import Card from "../components/Card/Card";

import styles from "./Pages.module.scss";
import EmptyPage from "../components/EmptyPage/EmptyPage";
import AppContext from "../context";

export default function Orders() {
  const { orders } = useContext(AppContext);

  return (
    <div className={styles.content}>
      {orders.length > 0 ? (
        <div>
          <h1 className={styles.mainTitle}>My orders</h1>

          {orders.map((order, index) => (
            <div className={styles.order} key={index}>
              <h2 className={styles.title}>Order #{order.id}</h2>
              <div className={styles.items}>
                {order.items.map((item, index) => (
                  <Card key={index} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyPage title='You have no orders' text='Make at least one order.' />
      )}
    </div>
  );
}
