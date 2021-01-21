'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("-----------------------")
    console.log(req.url.split("/")[1])
    console.log(req.url)
    console.log("-----------------------")
    Message.findAll({
        where: {
            roomId: req.url.split("/")[1]
        }
    })
    .then((messages) =>{
        console.log(messages)
        res.json({messages: messages})
    })
    .catch(() => {
        console.log("-----------------------------------")
        console.log("Message.findAll エラーーー！！！")
        console.log("-----------------------------------------")
        res.redirect('/')
    })

});

module.exports = router;
