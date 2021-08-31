import React, { useEffect, useRef, useState } from 'react';
import quesionsData from './helps.json'
import $ from 'jquery'

function QuestionItem(props) {
    let [isRead, setRead] = useState({ id: -1 })
    useEffect(() => {
        if (isRead.id != -1) {
            if ($(`#answer-${isRead.id}`).hasClass('question-readed')) {
                $(`#answer-${isRead.id}`).removeClass('question-readed')
                $(`#question-icon-${isRead.id}`).empty()
                $(`#question-icon-${isRead.id}`).append('<i><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path data-name="_ionicons_svg_ios-add (7)" d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z" transform="translate(-127.5 -127.5)" fill="currentColor"></path></svg></i>')
                return
            }
            $(`#answer-${isRead.id}`).addClass('question-readed')
            $(`#question-icon-${isRead.id}`).empty()
            $(`#question-icon-${isRead.id}`).append('<i><svg xmlns="http://www.w3.org/2000/svg" width="12" height="1.494" viewBox="0 0 12 1.494"><path data-name="_ionicons_svg_ios-remove (4)" d="M138.753,240H128.247a.747.747,0,0,0,0,1.494h10.506a.747.747,0,1,0,0-1.494Z" transform="translate(-127.5 -240)" fill="currentColor"></path></svg></i>')
            quesionsData.map(item => {
                if (item.id !== isRead.id) {
                    $(`#answer-${item.id}`).removeClass('question-readed')
                    $(`#question-icon-${item.id}`).empty()
                    $(`#question-icon-${item.id}`).append('<i><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path data-name="_ionicons_svg_ios-add (7)" d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z" transform="translate(-127.5 -127.5)" fill="currentColor"></path></svg></i>')
                }
            })
        }
    }, [isRead])
    return (
        <div className="questionItem-container" >
            <div class="question-container flex justify-between items-center" style={{ cursor: "pointer" }}
                onClick={() => {
                    setRead({ id: props.item.id })
                }}>
                <p style={{ color: "black", fontWeight: 600 }}>{props.item.question}</p>
                <p id={`question-icon-${props.item.id}`}>
                    <i><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path data-name="_ionicons_svg_ios-add (7)" d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z" transform="translate(-127.5 -127.5)" fill="currentColor"></path></svg></i>
                </p>
            </div>
            <div id={`answer-${props.item.id}`} class="answer-container" style={{ color: "rgb(119, 121, 140)" }}>
                {props.item.answer}
            </div>
        </div>
    );
}

export default QuestionItem;