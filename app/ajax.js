import $ from 'jquery';

// message submission
$('#messageSubmissionForm').submit(function(e) {
    e.preventDefault();
    const $form = $(this);
    const data = JSON.parse($("#hidden_data").val());
    data.speciality = $("#speciality").val();
    data.message = $("#message").val();
    const $s = $('.styleInput');
    $s.attr('disabled', true);
    $.getJSON('/message', {data: data}, (message) => {
        let messageFormHtml = `<input type="hidden" name="message" value=${message}>
            <div class="myMessage chatMessage" name=${message.messageId}>
                <p class="message">${message.text}</p>
            </div>`
        let $f = $("<form method='post' name=${message.messageId}>");
        $f.html(messageFormHtml);
        $(".myMessageBox").append($f);
        $form[0].reset();
        $s.attr('disabled', false);
    });
});

// synchronization of messages
// let getMessage;
// $(window).on("load", ()=> {
//     if(location.pathname.split('/')[1] === "room"){
//         getMessage = setInterval(() => {
//             $.getJSON('/message', {}, messages => {
//                 console.log(messages)
//                 let MessageTemplate = `<form method="post" name="1">
//                     <input type="hidden" name="message">
//                     <div class="myMessage chatMessage" name="1">
//                         <p class="message">hoge</p>
//                     </div>
//                 </form>`
//                 let friendsMessageTemplate = `<form method="post" name="1">
//                     <input type="hidden" name="message">
//                     <div class="myMessage chatMessage" name="1">
//                         <p class="message">hoge</p>
//                     </div>
//                 </form>`
//             });
//         }, 2000);
//     }else{
//         clearInterval(getMessage)
//     }
// })

