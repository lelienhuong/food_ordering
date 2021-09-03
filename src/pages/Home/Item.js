import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import LayoutContext from '../../context/LayoutContext';
import { ADD_AMOUNT, ADD_ITEM, DECREASE_AMOUNT } from '../../store/actions/types';

function Item(props) {
    let amount = 0;
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    let pathToDetail = location.pathname + `/product/${props.item.title.toLowerCase()}`
    let { setModalShow } = useContext(LayoutContext)
    let choosedItems = [...useSelector((state) => state.itemsInCart.choosedProducts)]
    choosedItems.map(item => {
        if (item.info.title === props.item.title) {
            amount = amount + item.amount
        }
    })
    let isClickedOnCartButton = useRef(false)
    const getProductDetail = () => {
        if (isClickedOnCartButton.current) return
        setModalShow(true)
        history.push({
            pathname: pathToDetail,
            state: { itemInfo: props.item }
        })
    }
    const handleBuying = () => {
        setModalShow(false)
        dispatch({ type: ADD_ITEM, payload: { data: props.item } })
    }
    const handleIncreasingAmount = (item) => {
        dispatch({ type: ADD_AMOUNT, payload: { data: item } })
    }
    const handleDecreasingAmount = (item) => {
        dispatch({ type: DECREASE_AMOUNT, payload: { data: item } })

    }
    return (
        <div className="item-container">
            <div style={{ height: "20vw" }}>
                <img onClick={() => getProductDetail()} className="item-image" src={props.item.link} />
            </div>
            <div onClick={() => getProductDetail()}>
                <p style={{ color: "rgb(13, 17, 54)", fontWeight: "600" }}>{props.item.title}</p>
                <p style={{ color: "rgb(119, 121, 140)" }}>{props.item.unit}</p>
            </div>
            <div class="flex justify-between items-center" style={{ marginTop: "2vw" }}>
                <p style={{ color: "rgb(0, 158, 127)", fontWeight: "700" }}>${props.item.price}</p>
                {
                    amount >= 1 ?
                        (<div class="flex h-full items-center justify-around adjust_amount-Button" style={{ padding: "0.3vw", width: "50%", height: "2.5vw" }}>
                            <button onClick={() => handleIncreasingAmount(props.item)}>
                                <svg style={{ height: "12px", width: "15px" }} xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                            </button>
                            <span>{amount}</span>
                            <button class="h-full" onClick={() => handleDecreasingAmount(props.item)}>
                                <svg style={{ width: "15px" }} xmlns="http://www.w3.org/2000/svg" width="12px" height="2px" viewBox="0 0 12 2"><rect data-name="Rectangle 522" width="12" height="2" rx="1" fill="currentColor"></rect></svg>
                            </button>
                        </div>) : (
                            <button onClick={() => handleBuying()} class="item-button" ><i class="bi bi-basket3-fill" style={{ marginRight: "3px" }}></i> Cart</button>
                        )
                }
            </div>
        </div >
    );
}

export default Item;