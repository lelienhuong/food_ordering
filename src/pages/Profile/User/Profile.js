import React, { useEffect, useLayoutEffect, useState } from 'react';
import $ from 'jquery'

function Profile(props) {
    let [width, setWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    })
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.profile-container').css('margin-top', $('.nav-container').outerHeight())
        $('.profile-container').css('margin-top', $('.navContainer').outerHeight())
    }, [width])
    return (
        <div className='profile-container'>
            hehe
        </div>
    );
}

export default Profile;