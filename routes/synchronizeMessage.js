'use strict';
const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Message = require('../models/message');

router.get('/', (req, res, next) => {
    // format submitted datas
    let ids;
    if(req.url === "/"){
        ids = [];
    }else{
        let url_datas = decodeURI(req.url).slice(2).split("&");
        ids = url_datas.map(d => d.split("=")[1]);
    }

    //get roomId
    let url = req.headers.referer
    let u = url.split("/")
    let roomId = u[u.length -1]

    let data = { Messages : [] , peopleInside: null};

    Message.findAll({
        where: {
            roomId: roomId
        }
    })
    .then((messageObjects) =>{
        const database = messageObjects.map(m => m.dataValues)
        const databaseIds = database.map(m => m.messageId)       
        const checkArrayDiff = (a, b) => {
            // a Viewのデータ
            // b databaseのデータ
            // find new objects
            for (let i = 0; i < b.length; i++) 
                if (a.indexOf(b[i]) === -1) data.Messages.push(database[i]);
            // find lost objects
            for (let i = 0; i < a.length; i++) 
                if (b.indexOf(a[i]) === -1) data.Messages.push(ids[i]);
        }
        checkArrayDiff(ids, databaseIds)
//-------------------------------------------------------------------------------------------
        Room.findOne({where: { roomId: roomId }})
        .then((room) => {
            data.peopleInside = room.peopleInside;
            res.json(data)
        })
        .catch((e) => {
            console.log("-----------------------------------")
            console.log("Room.findOne エラーーー！！！")
            console.log(e)
            console.log("-----------------------------------------")
            res.json(data)
        });
//-------------------------------------------------------------------------------------------      
    })
    .catch((e) => {
        console.log("-----------------------------------")
        console.log("Message.findAll エラーーー！！！")
        console.log(e)
        console.log("-----------------------------------------")
        res.redirect('/')
    })
});

module.exports = router;