var $ = require('jquery');
const fs = require('fs');

async function getBotAuthor(fileName, authorName, callback) {
    console.log('Trying to get the bot author of ' + fileName);
    let defaultPath = '.\\bots\\' + fileName + '\\package.json';
    console.log('Looking for file ' + defaultPath);

    await fs.access(defaultPath, 'r', (err) => { 
        console.log('Opened the file');
        if (err) {
            if (err.code === 'ENOENT') {
                console.error('File on path: ' + defaultPath + ' - do not exist');
                authorName.value = 'unknown';
                return;
            }
            authorName.value = 'unknown';
            throw err;
        }

        let rawData = fs.readFileSync(defaultPath);
        let data = JSON.parse(rawData);

        let author = data['author'];
        console.log('Found author: ' + author + ', for ' + fileName);
        authorName.value = author;
        return callback(author);
    });

    authorName.value = 'unknown';
}

const getPackageJsonPath = (fileName) => {
    return '.\\bots\\' + fileName + '\\package.json';
}

const getAuthorName = (fileName) => {
    const defaultPath = getPackageJsonPath(fileName);
    let rawData = fs.readFileSync(defaultPath);
    let data = JSON.parse(rawData);
    const authorName = data['author'];
    //console.log('Found author: ' + authorName + ', for ' + fileName);
    return authorName;
}

$(document).ready(async function () {
    const files = fs.readdirSync('./bots/');

    //files.forEach(file => {
    //    console.log('Found: ' + file);
    //});

    for (fileName of files) {
        
        const authorName = getAuthorName(fileName);
        console.log("Author of " + fileName + " is " + authorName);

        let option = document.createElement('option');
        option.id = fileName;
        option.text = fileName + ' by ' + authorName;
        //console.log('fileName = ' + fileName + ", option.text = " + option.text);
        document.querySelector('#bots').add(option, null);
    }
});