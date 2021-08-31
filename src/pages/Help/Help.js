import React, { useEffect } from 'react';
import $ from 'jquery'
import './styles/index.scss'
import questionsData from './helps.json'
import QuestionItem from './QuestionItem';
function Help(props) {
    useEffect(() => {
        $('.nav-container').addClass('navbar-otherPages')
        $('.help-container').css('margin-top', $('.nav-container').outerHeight())
        $('.help-container').css('height', `${$(window).outerHeight() - $('.nav-container').outerHeight()}`)
    }, [])
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