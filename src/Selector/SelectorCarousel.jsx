import React, { useState } from 'react';
import SelectorCard from '../Common/Card';
import Button from '../Common/Button';
import MaterialIcons from '../data/MaterialIcons';

const SLIDES_TO_SHOW = 3;

const SelectorCarousel = (props) => {
  let [activeItemIndex] = useState(0);

  return (
    <div className="container-fluid w-100">
      <div className="row justify-content-between align-items-center">
        <div className="col-1"><Button icon={MaterialIcons.ARROW_LEFT} shadow /></div>

        {props.items.map((item, i) => (
          <SelectorCard key={i} item={item} onAdd={props.onAdd} onDelete={props.onDelete} />
        ))}

        <div className="col-1"><Button icon={MaterialIcons.ARROW_RIGHT} shadow /></div>
      </div>
    </div>

  )
}

export default SelectorCarousel
