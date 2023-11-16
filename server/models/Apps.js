let mongoose = require('mongoose');

// create a model class

let appsModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: String
},
{

    collection: "apps"

});

module.exports = mongoose.model("apps", appsModel);