import React, { useState } from 'react';
import $ from 'jquery'

function OfferItem(props) {
    const [isCopied, setCopied] = useState(false)
    let item = props.item
    const handleCopyText = (code) => {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(code).select();
        document.execCommand("copy");
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
        $temp.remove();
    }
    return (
        <div class="mb-4 offerItem-container">
            <img style={{ height: "80%" }} class="w-full" src={item.image} />
            <div class="flex rounded justify-between items-center p-3 bg-white m-auto" style={{ width: "90%", height: "20%" }}>
                <p>{item.code}</p>
                {
                    isCopied ? (
                        <p style={{ color: "rgb(0, 158, 127)", fontWeight: "400", cursor: "pointer" }}>Copied</p>
                    ) : (
                        <p onClick={() => handleCopyText(item.code)} style={{ color: "rgb(0, 158, 127)", fontWeight: "600", cursor: "pointer" }}>Copy</p>
                    )
                }
            </div>
        </div>);
}

export default OfferItem;