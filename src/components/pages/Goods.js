import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../common/Item';
import BlankItem from '../common/BlankItem';
import styles from './Goods.module.scss';
import { useSelector } from 'react-redux';

const Goods = () => {
  const { category } = useParams();
  const { items } = useSelector(state => state.entities.sacredThings[category]);

  const capitalizeFirstLetter = text => text[0].toUpperCase() + text.substring(1);

  return ( 
    <>
      <p className={styles.title}>{capitalizeFirstLetter(category)}</p>
      <section className={styles.section}>
        <BlankItem />
        {items && items.map(item => <Item {...item} key={item.id} />)}
      </section>
    </>
  );
}
 
export default Goods;