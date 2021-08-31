import React from 'react';
import { routes } from '../../../pages/Home/routers/routers';

function SidebarExample(props) {
    return (
        <div>
            {
                routes.map(route => (
                    <ul>
                        <p>{route.meta.icon} {route.meta.title}</p>
                        {route.children && route.children.map(routeChild => (
                            <li>{routeChild.meta.icon} {routeChild.meta.title}</li>
                        ))
                        }
                    </ul>
                ))
            }
        </div>
    );
}

export default SidebarExample;