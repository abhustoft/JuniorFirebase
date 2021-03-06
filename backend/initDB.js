// server.js

// modules =================================================
var express        = require('express');
var ppa            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var Firebase       = require("firebase");

var salesRef = new Firebase('https://junioropen.firebaseio.com/Sales');

var options = {
    cwd: process.cwd()
};
var files;
var data;

require('child_process')
    .exec('ls -1 ../juniorsales/json/*.json', options, function(err, stdout, stderr){
        if(err){ console.log(stderr); throw err };
        // remove any trailing newline, otherwise last element will be "":
        stdout = stdout.replace(/\n$/, '');
        files = stdout.split('\n');

        for (var fn = 0; fn < files.length; fn++) {
            var name = files[fn];
            data = require(name);
            console.log(name);

            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                //salesRef.push(data[i]);
            }
        }
    });

