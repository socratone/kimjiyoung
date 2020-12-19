import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Item from '../Goods/Item';
import BlankItem from '../Goods/BlankItem';
import styles from './Goods.module.scss';
import { useSelector } from 'react-redux';

const Goods = () => {
  const { category } = useParams();
  const history = useHistory();
  const sacredThings = useSelector(state => state.entities.sacredThings);
  const account = useSelector(state => state.entities.user.account);

  if (!sacredThings[category]) return null;

  const capitalizeFirstLetter = text => text[0].toUpperCase() + text.substring(1);

  return ( 
    <>
      <p className={styles.title}>{capitalizeFirstLetter(category)}</p>
      <section className={styles.section}>
        {account === 'admin' && <BlankItem />}
        {sacredThings[category].items.map(item => (
          <Item 
            {...item} 
            onClick={() => history.push(`/item/${item.category}/${item.id}`)} 
            isEditMenu={true}
            key={item.id} 
          />
        ))}
      </section>
    </>
  );
}
 
export default Goods;