import React, { useEffect, useState } from 'react';
import MyVerticallyCenteredModal from '../../components/common/Modal/MyVerticallyCenteredModal';
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import { ADD_ADDRESS, ADD_CONTACT, UPDATE_ADDRESS, UPDATE_CONTACT } from '../../store/actions/types';

function ContactModal(props) {
    let feature = props.feature
    let setContact = props.setContact
    let [name, setName] = useState(props.item.name)
    let [phone, setPhone] = useState(props.item.phone)
    const dispatch = useDispatch()
    useEffect(() => {
        $('.modal-content').addClass('modal-contact')
    })
    const handleEdited = () => {
        let item = { name: name, phone: phone }
        dispatch({ type: UPDATE_CONTACT, payload: { data: item, index: props.index } })
        setContact({ value: false, feature: props.feature })
    }
    const handleCreate = () => {
        let item = { name: "Secondary", phone: phone }
        dispatch({ type: ADD_CONTACT, payload: { data: item } })
        setContact({ value: false, feature: props.feature })
    }
    const handleInput = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
            return
        }
        setPhone(e.target.value)
    }
    return (
        <div>
            <MyVerticallyCenteredModal
                show={feature ? true : false}
                onHide={() => {
                    setContact({ value: false, feature: props.feature })
                }}
            >
                <form onSubmit={() => feature === "edit" ? handleEdited() : handleCreate()} class="contact-container p-4">
                    <p class="text-xl font-bold">{feature === "edit" ? "Edit Contact" : "Add New Contact"}</p>
                    <input required name="phone" placeholder="Enter a phone number" onChange={(e) => handleInput(e)} defaultValue={feature === "edit" ? phone : ''} class="w-full h-12 input-name p-4 mb-6 mt-3" />
                    <button class="contact-button mt-3">Save Contact</button>
                </form>
            </MyVerticallyCenteredModal>
        </div>
    );
}

export default ContactModal;