'use strict';
const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res, next) => {
    // format url formed datas
    let data = {};
    let url_datas = decodeURI(req.url).slice(2).split("&");
    for (let i = 0; i < url_datas.length; i++) {
        let d = url_datas[i].match(/\[.*\]/)[0];
        d = d.slice(1, d.length-1);
        data[d] = url_datas[i].split("=")[1];
    }
    let url = req.headers.referer
    let u = url.split("/")
    let roomId = u[u.length -1]

    //create message
    Message.create({
        text: data.message,
        speciality: Boolean(data.speciality),
        roomId: data.roomId,
        sentBy: data.createdBy,
        createdAt: new Date()
    })
    .then((message) =>{
			res.json(message.dataValues);
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Message.create エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
    // Message.findAll({
    //     where: {
    //         roomId: roomId
    //     }
    // })
    // .then((messages) =>{
    //     res.json({messages: messages})
    // })
    // .catch(() => {
    //     console.log("-----------------------------------")
    //     console.log("Message.findAll エラーーー！！！")
    //     console.log("-----------------------------------------")
    //     res.redirect('/')
    // })
});

module.exports = router;
