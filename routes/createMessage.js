'use strict';
const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const nanoid = require("nanoid");

router.get('/', (req, res, next) => {
    // format url formed datas
    let data = {};
    let url_datas = decodeURI(req.url).slice(2).split("&");
    for (let i = 0; i < url_datas.length; i++) {
        let d = url_datas[i].match(/\[.*\]/)[0];
        d = d.slice(1, d.length-1);
        data[d] = url_datas[i].split("=")[1];
    }
    // create message
    let messageId = nanoid.nanoid(7);
    Message.create({
        messageId: messageId,
        text: data.message,
        speciality: Boolean(data.speciality),
        roomId: data.roomId,
        sentBy: data.self,
        createdAt: new Date()
    })
    .then((message) =>{
			res.json(message.dataValues);
    })
    .catch((e) => {
      console.log("-----------------------------------")
      console.log("Message.create エラーーー！！！")
      console.log(e)
      console.log("-----------------------------------------")
      res.json({})
    })
});

module.exports = router;
