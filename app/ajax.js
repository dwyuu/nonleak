'use strict';
import $ from 'jquery';

// synchronization of messages
let synchroInterval;
$(window).on("load", ()=> {
    if(location.pathname.split('/')[1] === "room") synchro();
    else clearInterval(synchroInterval);
})

const synchro = () => {
    synchroInterval = setInterval(() => {
        const data = $(".chatMessage").get().map(m => m.getAttribute("name"));
        $.getJSON('/synchronizeMessage', {data: data}, view_synchronization);
    }, 5000);
}

const view_synchronization = (data) => {
    
    if (data.peopleInside) $(".peopleInside").html(`<span class="description">PEOPLE INSIDE </span> ${data.peopleInside}人`)   

    const m = data.Messages;
    if(m === []) return;
    for (let i = 0; i < m.length; i++) {
        if(typeof(m[i]) == "string"){
            $(`form[name=${m[i]}]`).remove();
        }else if(Object.prototype.toString.call( m[i] ) === "[object Object]"){
            m[i].class = $(".descriptionBox").attr("self") === m[i].sentBy ? "myMessage":"otherMessage";
            let $f = $(`<form method='post' name=${m[i].messageId}>`);
            $f.html(messageFormHtml(m[i]));
            $(`.${m[i].class}Box`).append($f);
        }else{
            console.log("something went wrong")
        }
    }


}





// ----message submission-----------

// html template
const messageFormHtml = (message) => 
`<div class="${message.class} chatMessage" name=${message.messageId}>
    <p class="message">${message.text}</p>
</div>`

$('#messageSubmissionForm').submit(function(e) {
    e.preventDefault();
    clearInterval(synchroInterval)
    const data = JSON.parse($("#hidden_data").val());
    data.speciality = $("#speciality").val();
    data.message = $("#message").val();
    data.self = $(".descriptionBox").attr("self")
    const $s = $('.styleInput');
    $s.attr('disabled', true);
    $.getJSON('/createMessage', {data: data}, (message) => {
        if (message.messageId) {
            let $f = $(`<form method='post' name=${message.messageId}>`);
            message.class = "myMessage";
            $f.html(messageFormHtml(message));
            $(".myMessageBox").append($f);
        }else console.log("message submission failed")
        $(this)[0].reset();
        $s.attr('disabled', false);
        $s.focus()
        synchro();
    });
});

//message deletion

$(".chatBox").on("click", ".chatMessage", function(){
    clearInterval(synchroInterval);
    let id = $(this).attr("name");
    $(`form[name=${id}]`).remove();
    $.getJSON('/deleteMessage', {data: id}, (d) => {
        console.log(d.message)
        synchro();
    });
})



