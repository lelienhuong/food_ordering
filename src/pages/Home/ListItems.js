import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import LayoutContext from '../../context/LayoutContext';
import Item from './Item';

function ListItems(props) {
    let [maxDataSize, setMaxData] = useState(20)
    let [isLoading, setLoading] = useState(false)
    let { productsData } = useContext(LayoutContext)
    return (
        <div className="listItem-content--container">
            <div className="listItem-container">

                {productsData.map((item, index) => {
                    if (index > maxDataSize - 1) {
                        return
                    } else {
                        return (
                            <Item item={item} />
                        )
                    }
                })
                }
            </div>
            <button onClick={() => {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setMaxData(maxDataSize + 20)
                }, 500)
            }}
                class={`flex justify-center items-center listItem-button font-sm ${maxDataSize >= productsData.length ? "hidden" : ""}`}
            >
                Load more
                {
                    isLoading ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            style={{ marginLeft: "5px" }}
                            class={isLoading ? "" : "hidden"}
                        />
                    ) : (<></>)
                }
            </button>
        </div >
    );
}

export default ListItems;