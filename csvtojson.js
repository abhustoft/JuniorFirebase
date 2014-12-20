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


var options = {
    cwd: process.cwd()
};

/**
 * Extract root file name from a path
 * @param path
 * @returns {string}
 */
function getFileName(path){

    var fullFileName, fileNameWithoutExtension;

    console.log('Getting file name from path, index: ' + convertCount);

    // replace \ to /
    while( path.indexOf("\\") !== -1 ){
        path = path.replace("\\", "/");
    }

    fullFileName = path.split("/").pop();

    fileNameWithoutExtension = fullFileName.slice( 0, fullFileName.lastIndexOf(".") );

    return fileNameWithoutExtension;
}


/**
 *
 * @param err
 * @param stdout
 * @param stderr
 */
function parseFiles (err, fileList, stderr){

    if(err){ console.log(stderr); throw err };
    // remove any trailing newline, otherwise last element will be "":
    fileList = fileList.replace(/\n$/, '');
    files = fileList.split('\n');
    console.log('The raw file list:' + files.length + ' ' +files);

    noOfFiles = files.length;

    for (var fn = 0; fn < noOfFiles; fn++) {

        csvFileName[fn] = './' + files[fn];
        console.log('Registered csv File name: ' + csvFileName[fn]);

        csvConverter[fn] = new Converter(param);

        function convert(jsonObj){
            console.log(jsonObj[0]); //here is your result csv object
            var fd = fs.openSync('./juniorsales/json/' + getFileName(csvFileName[convertCount]) + '.json','w');
            var str = JSON.stringify(jsonObj);
            fs.writeSync(fd,str);
            convertCount++;
        }

        //end_parsed will be emitted once parsing finished
        csvConverter[fn].on("end_parsed", convert);

        rStream[fn]  = fs.createReadStream(csvFileName[fn]);
        toStream[fn] = fs.createWriteStream('./juniorsales/json/' + getFileName(csvFileName[fn]) + '.json');

        console.log('File loop end, fn: ' +fn + 'files: ' + files.length);
    }

    console.log('The csv files that are found:'+ csvFileName.length + ' '+ csvFileName);
}


require('child_process')
    .exec('ls -1 juniorsales/csv/*.csv', options, parseFiles);


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
