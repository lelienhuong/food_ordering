import React, { useEffect, useLayoutEffect, useState } from 'react';
import $ from 'jquery'
import './styles/index.scss'
import questionsData from './helps.json'
import QuestionItem from './QuestionItem';
function Help(props) {
    let [width, setWidth] = useState(window.innerWidth)
    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })
    })
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.help-container').css('margin-top', $('.nav-container').outerHeight())
        $('.help-container').css('margin-top', $('.navContainer').outerHeight())
        $('.help-container').css('height', `${$(window).outerHeight() - $('.nav-container').outerHeight()}`)
        $('.help-container').css('height', `${$(window).outerHeight() - $('.navContainer').outerHeight()}`)
    }, [width])
    return (
        <div class="help-container">
            <div class="help-body--container">
                <p class="text-xl font-bold ">F.A.Q</p>
                {
                    questionsData.map(item =>
                        <QuestionItem item={item} />
                    )
                }
            </div>
        </div>
    );
}

export default Help;