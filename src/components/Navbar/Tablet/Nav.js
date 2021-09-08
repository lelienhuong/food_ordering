import React, { useContext } from 'react';
import './tablet.scss'
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

function Nav(props) {
    // let [isSidebarOpen, setSidebarOpen] = React.useState(false)
    let { setOpenBill, setSidebarOpen, isSidebarOpen } = useContext(LayoutContext)
    var history = useHistory()
    React.useEffect(() => {
        if (!isSidebarOpen) {
            $('.nav_sidebar-content').removeClass('isShowContent')
            $('.nav_sidebar-container').removeClass('isOpen')
            $('.nav_sidebar-content').addClass('isClose')
            return
        }
        $('.nav_sidebar-content').removeClass('isClose')
        $('.nav_sidebar-container').addClass('isOpen')
        $('.nav_sidebar-content').addClass('isShowContent')
    }, [isSidebarOpen])
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
            <div class="nav_sidebar-container">
                <div class="nav_sidebar-content">
                    <div class="nav_sidebar-content--header">
                        <div class="flex justify-between w-full" >
                            <button onClick={() => handleCloseNavSidebar()} style={{ color: "rgba(0, 0, 0, 0.25)" }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="nav_sidebar-content--body">
                        <div class="nav_sidebar-content--products">
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
                                            title: 'Need Help',
                                            itemId: '/help',
                                        },
                                        {
                                            title: 'Offer',
                                            itemId: '/offer',
                                        },
                                    ]}
                                />
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Nav;