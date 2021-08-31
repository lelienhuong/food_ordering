import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../../components/common/Modal/MyVerticallyCenteredModal';
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import { ADD_ADDRESS, UPDATE_ADDRESS } from '../../store/actions/types';

function DeliveryModal(props) {
    let feature = props.feature
    let setDeliveryAddress = props.setDeliveryAddress
    let [name, setName] = useState(props.item.name)
    let [address, setAddress] = useState(props.item.address)
    const dispatch = useDispatch()
    useEffect(() => {
        $('.modal-content').addClass('modal-delivery')
    })
    const handleEdited = () => {
        let item = { name: name, address: address }
        dispatch({ type: UPDATE_ADDRESS, payload: { data: item, index: props.index } })
        setDeliveryAddress({ value: false, feature: props.feature })
    }
    const handleCreate = () => {
        let item = { name: name, address: address }
        dispatch({ type: ADD_ADDRESS, payload: { data: item } })
        setDeliveryAddress({ value: false, feature: props.feature })
    }
    const handleInput = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
            return
        }
        setAddress(e.target.value)
    }
    return (
        <div>
            <MyVerticallyCenteredModal
                show={feature ? true : false}
                onHide={() => {
                    setDeliveryAddress({ value: false, feature: props.feature })
                }}
            >
                <form onSubmit={() => feature === "edit" ? handleEdited() : handleCreate()} class="delivery-container p-4">
                    <p class="text-xl font-bold">{feature === "edit" ? "Edit Address" : "Add New Address"}</p>
                    <input required name="name" placeholder="Enter Title" onChange={(e) => handleInput(e)} defaultValue={feature === "edit" ? name : ''} class="w-full h-12 input-address p-4 mb-6 mt-3" />
                    <textarea required name="address" placeholder="Enter Title" onChange={(e) => handleInput(e)} defaultValue={feature === "edit" ? address : ''} class="textarea-address p-4" rows="5" />
                    <button class="delivery-button mt-3">Save Address</button>
                </form>
            </MyVerticallyCenteredModal>
        </div>
    );
}

export default DeliveryModal;