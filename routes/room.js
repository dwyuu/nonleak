'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');
const Room = require('../models/room');
const Message = require('../models/message');

// const uuid = require('uuid');

const os = require('os');

router.get('/', (req, res, next) => {
  res.render('room');
});

// if the DB changed, retreive its difference
router.get('/retreiveData', (req, res, next) => {
  res.json({loadavg: os.loadavg()});
});


//---------------

router.get('/:roomId', (req, res, next) => {
  Room.findOne({
    where: {
      roomId: req.url.split("/")[1]
    }
  })
  .then((room) => {
    Message.findAll({
      where: {
        roomId: req.url.split("/")[1]
      }
    })
    .then((messages) =>{
      console.log(messages)
      res.render('room', {room: room, messages: messages})
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Message.findAll エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  })
  .catch(() => {
    console.log("-----------------------------------")
    console.log("Room.findOne エラーーー！！！")
    console.log("-----------------------------------------")
    res.redirect('/')
  })
});

router.post('/:roomId', (req, res) => {
  if (req.body.room) {
    let room = JSON.parse(req.body.room);
    Message.create({
		  text: req.body.message,
		  speciality: Boolean(req.body.speciality),
		  roomId: room.roomId,
		  sentBy: room.createdBy
    })
    .then(() =>{
			let path = `${room.roomId}`
			res.redirect(path);
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Message.create エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  }
  else if (req.body.roomName) {
    Room.findOne({where:{roomName: req.body.roomName}})
    .then((room) =>{
      let peopleInside = room.peopleInside - 1
      room.update({peopleInside: peopleInside})
      res.redirect('/')
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Room.findOne エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  }
  else if (req.body.message) {
    let message = JSON.parse(req.body.message)
    Message.findOne({where:{messageId: message.messageId}})
    .then((message) =>{
      message.destroy();
      let path = `${message.roomId}`
			res.redirect(path);
    })
    .catch(() => {
      console.log("-----------------------------------")
      console.log("Message.findOne エラーーー！！！")
      console.log("-----------------------------------------")
      res.redirect('/')
    })
  }
})

module.exports = router;
