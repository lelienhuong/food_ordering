import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Item from './Item';
import itemsData from './items.json'
function ListItems(props) {
    return (
        <div className="listItem-container">
            {itemsData[0].fruitsAndVegetable.map((item, index) => (
                <Item item={item} />
            ))
            }
        </div>
    );
}

export default ListItems;