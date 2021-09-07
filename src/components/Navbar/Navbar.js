import React, { useLayoutEffect, useState } from 'react';
import Pc from './PC/Nav'
import Mobile from './Mobile/Nav'
import Tablet from './Tablet/Nav'

function Navbar(props) {
    const setLayout = (width) => {
        if (width < 576) {
            return <Mobile />
        }
        if (width < 992) {
            return <Tablet />
        }
        return <Pc />
    }
    let [width, setWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    })
    return (
        <div>
            {setLayout(width)}
        </div>
    );
}

export default Navbar;
