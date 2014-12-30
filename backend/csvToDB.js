var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var Firebase       = require("firebase");
var salesRef = new Firebase('https://junioropen.firebaseio.com/Sales');

var param={};

var files;
var data;

var rStream = [];
var csvConverter = [];
var csvFileName = [];
var monthData = [];
var convertCount = 0;
var noOfFiles = 0;

var dir = '/Users/abh/Projects/JuniorFirebase/juniorsales/';

var options = {
    cwd: process.cwd()
};

function rootFileName(fileName) {
    return fileName.slice(0, fileName.lastIndexOf("."));
}

/**
 *
 * @param err
 * @param stdout
 * @param stderr
 */
function parseFiles (files){

    noOfFiles = files.length;

    for (var fn = 0; fn < noOfFiles; fn++) {

        csvFileName[fn] = dir + 'csv/' + files[fn];
        console.log('Registered csv File name: ' + csvFileName[fn]);

        csvConverter[fn] = new Converter(param);

        function convert(jsonObj){
            console.log(jsonObj[0]); //here is your result csv object
            var fd = fs.openSync(dir + 'json/' + rootFileName(files[convertCount]) + '.json','w');
            var str = JSON.stringify(jsonObj);
            fs.writeSync(fd,str);
            monthData[convertCount] = jsonObj;
            salesRef.push(jsonObj); //Decompose????
            convertCount++;
        }

        //end_parsed will be emitted once parsing finished
        csvConverter[fn].on("end_parsed", convert);

        rStream[fn]  = fs.createReadStream(csvFileName[fn]);
    }
}

var files = fs.readdirSync(dir + 'csv/');
parseFiles(files);

//console.log(files);

function runStream () {
    console.log('Runstream: ' + convertCount);
    console.log('The csvsFileNames: ' + csvFileName)
    if (convertCount < noOfFiles) {
        rStream[convertCount].pipe(csvConverter[convertCount]);
    } else {
        clearInterval(timer);
    }
}

var timer = setInterval(runStream, 500)
