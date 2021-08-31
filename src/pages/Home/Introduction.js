import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
width:inherit;
border-style: hidden;
outline: none;
color: rgb(119, 121, 140);
padding-left: 1vw;
padding-right: 1vw;
::placeholder{
    color: rgb(119, 121, 140);
}
`;
function Introduction(props) {
    return (
        <div className="home-container">
            <div className="home-introduction--container">
                <h1 className="home-header--font">Groceries Delivered in 90 Minute</h1>
                <p className="home-description--font">Get your healthy foods & snacks delivered at your doorsteps all day everyday</p>
                <div class="flex h-12 items-center justify-between bg-white" style={{ boxShadow: "rgb(0 0 0 / 5%) 0px 21px 36px", width: "90%", margin: "auto", borderRadius: "6px" }}>
                    <div class="flex w-full h-full">
                        <div class="flex justify-center items-center" style={{ width: "20%", margin: "5px", backgroundColor: "rgb(247, 247, 247)", color: "rgb(0, 158, 127)", fontWeight: "700", borderRadius: "6px" }}>Grocery</div>
                        <SearchInput placeholder="Search your products from here" />
                    </div>
                    <button class="h-full" style={{ backgroundColor: "rgb(0, 158, 127)", width: "20%", color: "white", fontWeight: "700", borderTopRightRadius: "6px", borderBottomRightRadius: "6px" }}><i class="bi bi-search" style={{ marginRight: "5px" }}></i> Search</button>
                </div>
            </div>
        </div>
    );
}

export default Introduction;