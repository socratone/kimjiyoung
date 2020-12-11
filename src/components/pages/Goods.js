import React from 'react';
import { useParams } from 'react-router-dom';
import Item from '../common/Item';
import BlankItem from '../common/BlankItem';
import styles from './Goods.module.scss';
import { useSelector } from 'react-redux';

const Goods = () => {
  const { category } = useParams();
  const sacredThings = useSelector(state => state.entities.sacredThings);

  if (!sacredThings[category]) return null;

  const capitalizeFirstLetter = text => text[0].toUpperCase() + text.substring(1);

  return ( 
    <>
      <p className={styles.title}>{capitalizeFirstLetter(category)}</p>
      <section className={styles.section}>
        <BlankItem />
        {sacredThings[category].items.map(item => <Item {...item} key={item.id} />)}
      </section>
    </>
  );
}
 
export default Goods;