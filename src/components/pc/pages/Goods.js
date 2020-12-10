import React from 'react';
import { useParams } from 'react-router-dom';
import Item from '../../common/Item';
import styles from './Goods.module.scss';

import { sacredThings } from '../../../fakeData';

const Goods = () => {
  const { category } = useParams();
  const { items } = sacredThings[category];

  return ( 
    <>
      <p className={styles.title}>{category}</p>
      <section className={styles.section}>
        {items.map(item => <Item {...item} key={item.id} />)}
      </section>
    </>
  );
}
 
export default Goods;