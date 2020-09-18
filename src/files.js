const { packageJsonPath } = require('./paths');
const fs = require('fs');

module.exports = {
    getAuthorName: getAuthorName
}

function getAuthorName(fileName) {
    const defaultPath = packageJsonPath(fileName);
    if (fs.existsSync(defaultPath)) {
        let rawData = fs.readFileSync(defaultPath);
        let data = JSON.parse(rawData);
        const authorName = data['author'];
        return authorName;
    }
    console.warn(fileName + " don't have an author!");
    return '';
}
