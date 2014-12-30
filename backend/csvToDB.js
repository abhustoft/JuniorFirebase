var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var param={};

var files;
var data;

var rStream = [];
var toStream = [];
var csvConverter = [];
var csvFileName = [];
var convertCount = 0;
var noOfFiles = 0;

var dir = '/Users/abh/Projects/JuniorFirebase/juniorsales/';

var options = {
    cwd: process.cwd()
};

/**
 *
 * @param err
 * @param stdout
 * @param stderr
 */
function parseFiles (files){

    //console.log('The raw file list:' + files.length + ' ' +files);

    noOfFiles = files.length;

    for (var fn = 0; fn < noOfFiles; fn++) {

        csvFileName[fn] = dir + 'csv/' + files[fn];
        console.log('Registered csv File name: ' + csvFileName[fn]);

        csvConverter[fn] = new Converter(param);

        function convert(jsonObj){
            console.log(jsonObj[0]); //here is your result csv object
            var fd = fs.openSync(dir + 'json/' + files[convertCount] + '.json','w');
            var str = JSON.stringify(jsonObj);
            fs.writeSync(fd,str);
            convertCount++;
        }

        //end_parsed will be emitted once parsing finished
        csvConverter[fn].on("end_parsed", convert);

        rStream[fn]  = fs.createReadStream(csvFileName[fn]);
        var fileNameWithoutExtension = files[fn].slice( 0, files[fn].lastIndexOf(".") );
        toStream[fn] = fs.createWriteStream(dir + 'json/' + fileNameWithoutExtension + '.json');

        //console.log('File loop end, fn: ' +fn + 'files: ' + files.length);
    }

    //console.log('The csv files that are found:'+ csvFileName.length + ' '+ csvFileName);
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
