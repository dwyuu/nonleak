'use strict';
const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res, next) => {
    // format url formed datas
    let id = decodeURI(req.url).slice(2).split("=")[1];
    Message.findOne({where:{messageId: id}})
    .then((message) =>{
        console.log("this message is about to delete")
        console.log(message)
        message.destroy();
        res.json({})
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Message.findOne エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
});

module.exports = router;