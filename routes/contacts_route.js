/**
 * Created by ramya on 2/12/15.
 */
var router = require('express').Router();
var uuid = require('node-uuid');
var contacts = [{name: 'Ramya', location: 'Sunnyvale'}];

router.get('/angular', function(req, res){
    res.render('contacts');
});

router.get('/', function(req, res) {
    res.status(200).json(contacts);
});

router.post('/', function(req, res) {
    req.body._id = uuid.v4();
    contacts.push(req.body);
    res.status(201).json(req.body);
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    for(var i = 0; i < contacts.length; i++) {
        if(contacts[i]._id === id) {
            contacts.splice(i,1);
            res.status(200).json( {message: 'Deleted resource with id: '+ id});
            return;
        }
    }
    res.status(404).json( {message: 'Resource not found with id: '+ id});
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    for(var i = 0; i < contacts.length; i++) {
        if(contacts[i]._id === id) {
            contacts[i] = req.body;
            res.status(200).json( {message: 'Updated resource with id: '+ id} );
            return;
        }
    }
    res.status(404).json( {message: 'Resource not found with id: '+ id} );
});

module.exports = router;