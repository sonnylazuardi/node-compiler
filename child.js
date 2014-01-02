var Sync = require('sync');
var fs = require('fs');
var sh = require('execSync');
var targetSource;
var targetExe;
var targetInput;
var fileName;

process.on('message', function(message) {
    // Process data
    Sync(function(){
        fileName = "test" + message.id;
        targetSource = __dirname+"/scripts/"+fileName+".cpp";
        targetExe = "scripts/exe/"+fileName;
        targetInput = __dirname+"/scripts/input/" + fileName + ".txt";
        fs.writeFile(targetSource, message.script, function(err) {
            fs.writeFile(targetInput, message.inputs, function(err) {
                Sync(function () {
                    var result = sh.exec("g++ " + targetSource + " -o " + targetExe);
                    if (result.code == 1) { //error
                        process.send({error: result.stdout, success:false, id:message.id});
                    } else  { //success 
                        Sync(function() {
                            var start = new Date().getTime();
                            var result2 = sh.exec("cd scripts/exe; ./" + fileName + " < " + targetInput);
                            if (result2.code == 1) { //error
                                process.send({error: result2.stdout, success:false, id:message.id});        
                            } else  { //success
                                var end = new Date().getTime();
                                var time = end - start;
                                process.send({result: result2.stdout, timeExec: time, success:true, id:message.id});
                            }
                        });
                    }
                });
            });
        });        
    });
});