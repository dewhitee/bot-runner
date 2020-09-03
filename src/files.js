const $ = require('jquery');
const fs = require('fs');

const getPackageJsonPath = (fileName) => {
    return '.\\bots\\' + fileName + '\\package.json';
}

const getAuthorName = (fileName) => {
    const defaultPath = getPackageJsonPath(fileName);
    let rawData = fs.readFileSync(defaultPath);
    let data = JSON.parse(rawData);
    const authorName = data['author'];
    return authorName;
}

$(document).ready(async function () {
    const files = fs.readdirSync('./bots/');

    for (fileName of files) {
        const authorName = getAuthorName(fileName);
        console.log("Author of " + fileName + " is " + authorName);

        let option = document.createElement('option');
        option.id = fileName;
        option.text = fileName + ' by ' + authorName;
        document.querySelector('#bots').add(option, null);
    }
});