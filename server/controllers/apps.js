var express = require('express');
var router = express.Router();
const apps = require('../models/apps');

// Get router for Read Operation
module.exports.ReadappsData = async (req, res, next) => {
    try {
        const appsList = await apps.find();
        res.render("apps/list", {
            title: "My apps List",
            appsList: appsList
        });
    } catch (err) {
        console.error(err);
        res.render("apps/list", {
            error: "Server Error"
        });
    }
};

// Get router for Create Operation --> Display the add apps page
module.exports.DisplayAddapps = (req, res, next) => {
    res.render('apps/add', {
        title: 'Add apps'
    });
};

// Post router for Create Operation --> Process the add apps page
module.exports.Addapps = async (req, res, next) => {
    try {
        let newapps = new apps({
            "Name": req.body.Name,
            "Author": req.body.Author,
            "Published": req.body.Published,
            "Description": req.body.Description,
            "Price": req.body.Price
        });
        await apps.create(newapps);
        res.redirect('/appslist');
    } catch (err) {
        console.error(err);
        res.render("apps/list", {
            error: "Server Error"
        });
    }
};

// Get router for Edit/Update Operation --> Display the edit apps page
module.exports.DisplayEditapps = async (req, res, next) => {
    try {
        const id = req.params.id;
        const appstoEdit = await apps.findById(id);
        res.render('apps/edit', {
            title: 'Edit apps',
            apps: appstoEdit
        });
    } catch (err) {
        console.error(err);
        res.render("apps/list", {
            error: "Server Error"
        });
    }
};

// Post router for Edit/Update Operation --> Process the edit apps page
module.exports.Editapps = (req, res, next) => {
    // Implementation for updating a apps by id
};

// Get router for Delete Operation
module.exports.Deleteapps = async (req, res, next) => {
    try {
        const id = req.params.id;
        await apps.findByIdAndDelete(id);
        res.redirect("/appslist");
    } catch (err) {
        console.error(err);
        res.render("apps/list", {
            error: "Server Error"
        });
    }
};

// Assigning the individual routes to the router
router.get('/', module.exports.ReadappsData);
router.get('/add', module.exports.DisplayAddapps);
router.post('/add', module.exports.Addapps);
router.get('/edit/:id', module.exports.DisplayEditapps);
router.post('/edit/:id', module.exports.Editapps);
router.get('/delete/:id', module.exports.Deleteapps);

module.exports.router = router;
