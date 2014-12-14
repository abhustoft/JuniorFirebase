// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var Firebase = require("firebase");


var nov14 = require('./2014Nov.json');

var storo = new Firebase('https://junioropen.firebaseio.com/StoroSales');
var sandvika = new Firebase('https://junioropen.firebaseio.com/SandvikaSales');
var drobak = new Firebase('https://junioropen.firebaseio.com/DrobakSales');

/*
for (var i = 0; i < nov14.length; i++) {
    if (nov14[i].store === 'Storo') {
        storo.push(nov14[i]);
    }
    if (nov14[i].store === 'Sandvika') {
        sandvika.push(nov14[i]);
    }
    if (nov14[i].store === 'Drøbak') {
        drobak.push(nov14[i]);
    }

}
*/

var options = {
    cwd: process.cwd()
};
var files;
var data;
require('child_process')
    .exec('ls -1 juniorsales/2012/*.json', options, function(err, stdout, stderr){
        if(err){ console.log(stderr); throw err };
        // remove any trailing newline, otherwise last element will be "":
        stdout = stdout.replace(/\n$/, '');
        files = stdout.split('\n');

        for (var fn = 0; fn < files.length; fn++) {
            var name = './' + files[fn];
            data = require(name);
            console.log(name);

            for (var i = 0; i < data.length; i++) {
                if (data[i].store === 'Storo') {
                    storo.push(data[i]);
                }
                if (data[i].store === 'Sandvika') {
                    sandvika.push(data[i]);
                }
                if (data[i].store === 'Drøbak') {
                    drobak.push(data[i]);
                }

            }
        }
    });

