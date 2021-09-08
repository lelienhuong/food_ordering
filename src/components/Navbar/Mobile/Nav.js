import React, { useContext } from 'react';
import '../Tablet/tablet.scss'
import $ from 'jquery'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Navigation } from 'react-minimal-side-navigation/lib';
import { useHistory } from 'react-router';
import LayoutContext from '../../../context/LayoutContext';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';


const customStyles = {
    content: {
        top: '0',
        left: '0',
        width: '60%',
        padding: 0,
        border: 0,
        boxShadow: "#d3c8c8 0px 21px 36px",
    },
};

function Nav(props) {
    let { setOpenBill, setSidebarOpen, isSidebarOpen } = useContext(LayoutContext)
    var history = useHistory()
    const handleCloseNavSidebar = () => {
        setSidebarOpen(false)
    }
    const handleOpenNavSidebar = () => {
        setOpenBill(false)
        setSidebarOpen(true)
    }
    return (
        <div class="navContainer">
            <div class="flex items-center">
                <button onClick={() => handleOpenNavSidebar()}><i class="bi bi-list mr-4 text-4xl"></i></button>
                <img src="/image/logo.svg" />
            </div>
            <div onClick={() => history.push('/checkout')}>
                <img style={{ width: "auto", height: "1.5rem" }} src='/image/logoIcon.png' />
            </div>

            <CSSTransition
                in={isSidebarOpen}
                timeout={100}
                classNames="dialog"
            >
                <Modal
                    id="nav-sidebar-modal"
                    closeTimeoutMS={200}
                    isOpen={isSidebarOpen}
                    onRequestClose={() => setSidebarOpen(false)}
                    style={customStyles}
                >
                    <div style={{ borderBottom: "1px solid rgb(247, 247, 247)" }}>
                        <div class="flex justify-between w-full h-12 p-2" >
                            <button onClick={() => handleCloseNavSidebar()} style={{ color: "rgba(0, 0, 0, 0.25)" }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="nav_sidebar-content--body">
                        <div class="mt-2">
                            <Router>
                                <Navigation
                                    activeItemId="/"
                                    onSelect={({ itemId }) => {
                                        history.push(itemId)
                                    }}
                                    items={[
                                        {
                                            title: 'Home',
                                            itemId: '/',
                                        },
                                        {
                                            title: 'Checkout',
                                            itemId: '/checkout',
                                        },
                                        {
                                            title: 'Offer',
                                            itemId: '/offer',
                                        },
                                        {
                                            title: 'Need Help',
                                            itemId: '/help',
                                        }
                                    ]}
                                />
                            </Router>
                        </div>
                    </div>
                    {/* </ReactModal> */}

                </Modal>
            </CSSTransition>
        </div >
    );
}

export default Nav;