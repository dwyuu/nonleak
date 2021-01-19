import $ from 'jquery';
setInterval(() => {
    $.get('/message', {}, (messages) => {
    });
}, 2000);