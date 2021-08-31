import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import MyVerticallyCenteredModal from '../../components/common/Modal/MyVerticallyCenteredModal';
import LayoutContext from '../../context/LayoutContext';
import { ADD_ITEM } from '../../store/actions/types';

function ItemDetail(props) {
    const history = useHistory()
    const location = useLocation()
    let { itemInfo } = location.state
    let { modalShow, setModalShow } = useContext(LayoutContext)
    
    // const itemInfo = props.itemInfo
   
    const dispatch = useDispatch()
    let choosedItems = useSelector((state) => state.itemsInCart.choosedProducts)

    const handleBuying = () => {
        dispatch({ type: ADD_ITEM, payload: { data: itemInfo } })
    }
    return (
        <MyVerticallyCenteredModal
            // itemInfo={itemInfo}
            show={modalShow}
            onHide={() => {
                history.push("/grocery")
                setModalShow(false)
            }}
        >
            <div>
                <div class="flex">
                    <div class="col-6" style={{ borderRight: "2px solid rgb(247, 247, 247)" }} >
                        <div>
                            <img class="w-full h-auto" src={itemInfo.link} />
                        </div>
                    </div>
                    <div class="p-8">
                        <div>
                            <p class="text-2xl mb-2"><strong>{itemInfo.title}</strong></p>
                            <p class="mb-6" style={{ color: "rgb(119, 121, 140)" }}>{itemInfo.unit}</p>
                        </div>
                        <p class="mb-12">{itemInfo.description}</p>
                        <div class="flex justify-between items-center text-xl">
                            <p style={{ color: "rgb(0, 158, 127)", fontWeight: "700" }}>${itemInfo.price}</p>
                            <button onClick={() => handleBuying()} class="item-button"><i class="bi bi-basket3-fill" style={{ marginRight: "3px" }}></i> Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </MyVerticallyCenteredModal>
    );
}

export default ItemDetail;