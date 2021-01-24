'use strict';
const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/', (req, res, next) => {
    // format url formed datas
    let name = decodeURI(req.url).slice(2).split("=")[1];
    Room.findOne({where:{roomName: name}})
    .then((room) =>{
        room.destroy();
        res.json({message: "deletion success"})
    })
    .catch((e) => {
        console.log("-----------------------------------")
        console.log("Room.findOne エラーーー！！！")
        console.log(e)
        console.log("-----------------------------------------")
        res.json(data)
    });
});

module.exports = router;