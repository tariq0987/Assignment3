var express = require('express');
var router = express.Router();
const appsController = require('../controllers/appss');

// Get router for Read Operation
router.get('/', appsController.ReadappsData);

// Get router for Create Operation --> Display the add apps page
router.get('/add', appsController.DisplayAddapps);

// Post router for Create Operation --> Process the add apps page
router.post('/add', appsController.Addapps);

// Get router for Edit/Update Operation --> Display the edit apps page
router.get('/edit/:id', appsController.DisplayEditapps);

// Post router for Edit/Update Operation --> Process the edit apps page
router.post('/edit/:id', appsController.Editapps);

// Get router for Delete Operation
router.get('/delete/:id', appsController.Deleteapps);

module.exports = router;
