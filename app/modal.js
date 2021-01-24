'use strict';
import $ from 'jquery';
const $la = $(".login_anchor")

//login modal-----------------------------------------------------
const $um = $(".user_modal");
let display_user = false;

$(".user").on("click", () => {
    if (display_user) {
        $ov.css("display", "none")
        $um.css("display", "none")
    }else{
        $ov.css("display", "block")
        $um.css("display", "block")
    }
    display_user = !display_user
})

// secret message modal-----------------------------------------------
$(".secret_message_overlay").on("click", ()=>{
    $(".secret_message_overlay").css("display", "none");
    $(".secret_message_modal").css("display", "none");
})


//create modal---------------------------------------------------------
const $cm = $(".create_modal");
let display_create = false

$(".create").on("click", () => {
    if (display_create) {
        $la.css("z-index", "9999");
        $ov.css("display", "none")
        $cm.css("display", "none")
    }else{
        $la.css("z-index", "5000");
        $ov.css("display", "block")
        $cm.css("display", "block")
    }
    display_create = !display_create
})

// enter modal-------------------------------------------------------

const $em = $(".enter_modal");
let display_enter = false;

$(".enter").on("click", () => {
    if (display_create) {
        $la.css("z-index", "9999");
        $ov.css("display", "none")
        $em.css("display", "none")
    }else{
        $la.css("z-index", "5000");
        $ov.css("display", "block")
        $em.css("display", "block")
    }
    display_enter = !display_enter
})

// encode modal-------------------------------------------------------

const $ecm = $(".encode_modal");
let display_encode = false;

$(".encode").on("click", () => {
    if (display_create) {
        $la.css("z-index", "9999");
        $ov.css("display", "none")
        $ecm.css("display", "none")
    }else{
        $la.css("z-index", "5000");
        $ov.css("display", "block")
        $ecm.css("display", "block")
    }
    display_encode = !display_encode
})


// decode modal-------------------------------------------------------

const $dcm = $(".decode_modal");
let display_decode = false;

$(".decode").on("click", () => {
    if (display_decode) {
        $la.css("z-index", "9999");
        $ov.css("display", "none")
        $dcm.css("display", "none")
    }else{
        $la.css("z-index", "5000");
        $ov.css("display", "block")
        $dcm.css("display", "block")
    }
    display_decode = !display_decode
})



//overlay-------------------------------------------------------
const $ov = $(".overlay");

$ov.on("click", () => {
    $la.css("z-index", "9999");
    $ov.css("display", "none");
    $um.css("display", "none");
    $cm.css("display", "none")
    $em.css("display", "none")
    $ecm.css("display", "none")
    $dcm.css("display", "none")
    display_user = false;
    display_create = false;
    display_enter = false;
    display_encode = false;
    display_decode = false;
})


//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------




