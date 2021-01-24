'use strict';
import $ from 'jquery';
$(".roomCreate").submit(() => {
    const v = $(".styleInput[name='roomName']").val();
    const roomNames = $("input[type='radio']").get().map(v => v.value);
    if (roomNames.indexOf(v) !== -1) {
       alert("YOU ALREADY OWN THE SAME NAME ROOM");
       return false;
    }
})
