//EXPRESS
const express = require('express');
const router = express.Router();

//MODEL
const Room = require('../models/room');
const SecretMessage = require('../models/secret_message')

//utility
const authenticationEnsurer = require('./authentication-ensurer');
const uuid = require('uuid');
const nanoid = require("nanoid");


/* GET home page. */
router.get('/', function(req, res, next) {
	const messageKey = nanoid.nanoid(7);
	SecretMessage.findOne({where: {show: true}})
	.then((secret_message) => {
		let data = {messageKey: messageKey};
		if (secret_message){
			data.secret_message = secret_message.text;
			secret_message.update({show: false});
		} 
		if (req.user) {
			data.user = req.user.displayName;
			Room.findAll({where: {createdBy: req.user.id}})
			.then(rooms => {
			  data.rooms = rooms;
			  res.render('index', data);
			})
			.catch(() => {
			  res.render('index', data);
			})
		 } else {
			res.render('index', data);
		}
	})
	.catch(() => {
		let data = {messageKey: messageKey};
		if (req.user) {
			data.user = req.user.displayName;
			Room.findAll({where: {createdBy: req.user.id}})
			.then(rooms => {
			  data.rooms = rooms;
			  res.render('index', data);
			})
			.catch(() => {
			  res.render('index', data);
			})
		 } else {
			res.render('index', data);
		}
	})
});

router.post('/', (req, res) => {
	if (req.body.time) {
		const roomId = uuid.v4();
		const roomKey = nanoid.nanoid(7);
		let expiration;
		switch (req.body.time) {
			case "hours":
				expiration = parseInt(req.body.num)*60*60;
				break;	
			case "minutes":
				expiration = parseInt(req.body.num)*60;
				break;		
			case "seconds":
				expiration = parseInt(req.body.num);
				break;
		}
		Room.create({
		  roomId: roomId,
		  roomKey: roomKey,
		  roomName: req.body.roomName.slice(0, 255) || '（名称未設定）',
		  createdBy: req.user.id,
		  expiration: expiration,
		  capacity: parseInt(req.body.capacity),
		  peopleInside: 0
		})
		.then(() =>{
			res.redirect('/');
		})
		.catch(() => {
			console.log("-----------------------------------")
			console.log("Room.create エラーーー！！！")
			console.log("-----------------------------------------")
			res.redirect('/')
		})
	}else if(req.body.roomName || req.body.roomKey){
		let where;
		if (req.body.roomName) where = {roomName: req.body.roomName}
		else where = {roomKey: req.body.roomKey}
		Room.findOne({where: where
		})
		.then(room => {
			if (room.capacity === room.peopleInside) {
				//リダイレクトの際に入れなかったアラートを出す処理を入れる
				console.log(room.capacity)
				console.log(room.peopleInside)
				console.log("failed to enter the room, since it would exceed the room's capacity")
				res.redirect('/')
			}else{
				let peopleInside = room.peopleInside + 1
				room.update({
					peopleInside: peopleInside
				})
				let path = `room/${room.roomId}`
				res.redirect(path);
			}
		})
		.catch(() => {
			console.log("-----------------------------------")
			console.log("Room.findOne エラーーー！！！！")
			console.log("-----------------------------------------")
			res.redirect('/')
		})
	}else if(req.body.message && req.body.messageKey){
		SecretMessage.create({
			text: req.body.message,
			messageKey: req.body.messageKey,
			show: false
		  })
		.then(() =>{
			res.redirect('/');
		})
		.catch(() => {
			console.log("-----------------------------------")
			console.log("SecretMessage.create エラーーー！！！！")
			console.log("-----------------------------------------")
			res.redirect('/')
		})
	}else if(req.body.messageKey){
		SecretMessage.findOne({where: {messageKey : req.body.messageKey}})
		.then(secret_message => {
			secret_message.update({show: true})
			.then(() => res.redirect('/'))		
		})
		.catch(() => {
			console.log("-----------------------------------")
			console.log("SecretMessage.findOne エラーーー！！！！")
			console.log("-----------------------------------------")
			res.redirect('/')
		})
	}else{
		console.log("something went wrong")
	}

  });

module.exports = router;
