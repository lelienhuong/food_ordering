import React, { useLayoutEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import ItemDetail from './ItemDetail';
import Mobile from './Mobile/Home'
import Pc from './PC/Home'
import Tablet from './Tablet/Home'

const setLayout = (width) => {
    if (width < 576) {
        return <Mobile />
    }
    if (width < 992) {
        return <Tablet />
    }
    return <Pc />
}
function Home(props) {
    let [width, setWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        // setWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    })
    return (
        <div>
            <Switch>
                <Route
                    exact
                    path="/grocery/product/:name"
                    component={ItemDetail}
                />
            </Switch>
            {setLayout(width)}
        </div>
    );

}

export default Home;