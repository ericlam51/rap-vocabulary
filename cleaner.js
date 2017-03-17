var fs = require("fs");

var content = '';

fs.readFile("resources/lyrics/2pac.txt", "utf-8", function(err, data) {
    content = data;
    writeToFile();
});

function writeToFile() {
    content = content.replace(/(?:\r\n|\r|\n)/g, '');
    fs.appendFile("resources/lyrics/1pac.txt", content, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
}
