'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Room = require('../models/room');
const Message = require('../models/message');

// const uuid = require('uuid');
const nanoid = require("nanoid");


//---------------

router.get('/:roomId', (req, res, next) => {
  Room.findOne({
    where: {
      roomId: req.url.split("/")[1]
    }
  })
  .then((room) => {
    Message.findAll({where: { roomId: req.url.split("/")[1]} })
    .then((messages) =>{
      room = room.dataValues;
      //ログインしているならユーザID、それ以外ならnanoidを生成しhtmlに埋め込む
      room.self = req.user? req.user.id : nanoid.nanoid(7) ;
      res.render('room', {room: room, messages: messages})
    })
    .catch((e) => {
      console.log("-----------------------------------")
      console.log("Message.findAll エラーーー！！！")
      console.log(e)
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  })
  .catch((e) => {
    console.log("-----------------------------------")
    console.log("Room.findOne エラーーー！！！")
    console.log(e)
    console.log("-----------------------------------------")
    res.redirect('/')
  })
});

router.post('/:roomId', (req, res) => {
  if (req.body.roomName) {
    // get out of this room
    Room.findOne({where:{roomName: req.body.roomName}})
    .then((room) =>{
      let peopleInside = room.peopleInside - 1
      room.update({peopleInside: peopleInside})
      res.redirect('/')
    })
    .catch((e) => {
      console.log("-----------------------------------")
      console.log("Room.findOne エラーーー！！！")
      console.log(e)
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  }
})

module.exports = router;
