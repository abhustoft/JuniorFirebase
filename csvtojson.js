var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var param={};

var files;
var data;

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

    // replace \ to /
    while( path.indexOf("\\") !== -1 ){
        path = path.replace("\\", "/");
    }

    fullFileName = path.split("/").pop();

    fileNameWithoutExtension = fullFileName.slice( 0, fullFileName.lastIndexOf(".") );

    return fileNameWithoutExtension;
}

var rStream = [];
var toStream = [];
var csvConverter = [];


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

    for (var fn = 0; fn < files.length - 1; fn++) {
        var csvFileName = './' + files[fn];
        console.log(csvFileName);

        csvConverter[fn] = new Converter(param);

        function convert(jsonObj){
            console.log(jsonObj); //here is your result csv object
            var fd = fs.openSync('./juniorsales/json/' + getFileName(csvFileName) + '.json','w');
            var str = JSON.stringify(jsonObj);
            fs.writeSync(fd,str);
        }

        //end_parsed will be emitted once parsing finished
        csvConverter[fn].on("end_parsed", convert);

        rStream[fn]  = fs.createReadStream(csvFileName);
        toStream[fn] = fs.createWriteStream('./juniorsales/json/' + getFileName(csvFileName) + '.json');

        //rStream[fn].pipe(csvConverter[fn]);
    }
}


require('child_process')
    .exec('ls -1 juniorsales/csv/*.csv', options, parseFiles);

var i = 0;
function runStream () {
    console.log('Runstream: ' + i);
    rStream[i].pipe(csvConverter[i++]);
}

var timer = setInterval(runStream, 5000)
