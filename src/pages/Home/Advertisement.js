import React, { useState } from 'react';
import Carousel from 'react-elastic-carousel';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 2 }
];
const adImages = [
    { title: "Coupon Saving", link: "/image/ad-1.png" },
    { title: "Free Delivery", link: "/image/ad-2.png" },
    { title: "Gift Voucher", link: "/image/ad-3.png" }
]
function Advertisement(props) {
    const [advertisements, setAdvertisement] = useState(adImages)
    return (
        <div className="advertisement-container">
            <Carousel breakPoints={breakPoints}>
                {advertisements.map((item, index) =>
                    <img className="advertisement-image" key={index} alt={item.title} src={item.link} />
                )}
            </Carousel>
        </div>
    );
}

export default Advertisement;