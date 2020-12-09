import React from 'react';
import Item from '../../common/Item';
import styles from './Goods.module.scss';

const Goods = ({ items, title }) => {
  return ( 
    <>
      <p className={styles.title}>{title}</p>
      <section className={styles.section}>
        {items.map(item => <Item {...item} key={item.id} />)}
      </section>
    </>
  );
}
 
export default Goods;