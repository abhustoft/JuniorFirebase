var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./csv_file.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var param={};
var csvConverter=new Converter(param);

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    console.log(jsonObj); //here is your result json object
});

//read from file
fileStream.pipe(csvConverter);