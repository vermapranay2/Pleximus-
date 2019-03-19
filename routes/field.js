const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const router = express.Router();
const user = require('./user')
const ObjectId = require('mongodb').ObjectID;

const Field = require('../models/Fields');

router.get('/listing',user.loggedIn,(req,res) => {
    data={}
    data.layout = false
    Field.find({'user' : req.session.passport.user}).exec((err,result) => {
        if(err){
            console.log(err)
            data.err=err
            res.render('fieldlisting', data )
        }
        else{
            
            data.result = result
            res.render('fieldlisting', data )
        }
    })
	
})

router.get('/add',user.loggedIn,(req,res) => {
    res.render('fieldadd',{layout: false})
})

router.post('/add',user.loggedIn,(req,res) => {
    var newField = new Field();
    newField.name = req.body.name;
    newField.img = "https://www.evolvedigitas.com/blog/wp-content/uploads/2018/04/education.jpg";
    newField.user = req.session.passport.user
    newField.save((err) => {
        if(err){
            req.flash('error', 'Sorry something went wrong.');
            res.redirect('/field/add');
        }
        else{
            req.flash('success', 'Field saved successfully.');
            res.redirect('/field/listing');
        }
    })
})

router.get('/edit/:id',user.loggedIn,(req,res) => {
    var data = {}
    data.layout = false
    Field.findOne({ '_id' : req.params.id}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            data.result = result;
            
            res.render('fieldedit', data);
        }
});
})

router.post('/edit/:id',user.loggedIn, (req, res) => {
    var data = {};
	req.body.img = "https://www.evolvedigitas.com/blog/wp-content/uploads/2018/04/education.jpg";
    req.body.user = req.session.passport.user
	Field.findOneAndUpdate( {_id: req.params.id}  , req.body , function (err, updatedresult) {
		if (err) {
			req.flash('error', 'Sorry something went wrong.');
			res.redirect('/listing');
		}else{
            console.log(req.body)
            console.log(updatedresult)
			req.flash('success', 'Field updated successfully.');
			res.redirect('/field/listing');
		}
}); 
})

router.get('/delete/:id',user.loggedIn,(req, res) => {
    var data = {};
	
	
	Field.findByIdAndRemove(req.params.id, req.body, (err, deletedResult) => {
		if (err) {
            console.log(err)
			req.flash('error', 'Sorry something went wrong.');
			res.redirect('back');
		}else{
            console.log(deletedResult)
			req.flash('success', 'Field deleted successfully.');
			res.redirect('back');
		}
    }); 
})

module.exports = router;


