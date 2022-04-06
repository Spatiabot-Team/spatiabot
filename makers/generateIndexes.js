const fs = require("fs");
const createFileFromTemplate = require('./createFileFromTemplate');
const capitalizeFirstLetter = require('./capitalizeFirstLetter');
const { clc } = require("@nestjs/common/utils/cli-colors.util");
const { EOL } = require('os');

module.exports = function generateIndexes(module) {

    generateIndexesFor('CommandHandlers', `${ __dirname }/../src/${ module }/application/commands/handlers`);
    generateIndexesFor('EventHandlers', `${ __dirname }/../src/${ module }/application/events/handlers`);
    generateIndexesFor('QueryHandlers', `${ __dirname }/../src/${ module }/application/queries/handlers`);

}

function generateIndexesFor(component, path) {

    const dirs = fs.readdirSync(path);

    let strImports = '';
    let strObjects = `export const ${ component } = [`;

    dirs.forEach(d => {

        if (fs.lstatSync(`${ path }/${ d }`).isDirectory()) {

            const files = fs.readdirSync(`${ path }/${ d }`);
            const classNames = files.map(adaptToCLass);

            // Imports
            strImports += classNames.map((c, index) => `import {${ c }} from "./${ d }/${ files[index].slice(0, -3) }";`).join(EOL);
            strImports += EOL;

            // Objects
            strObjects += EOL + '    // ' + capitalizeFirstLetter(d) + EOL;
            strObjects += '    ' + classNames.join(',' + EOL + '    ')+ ',' + EOL;

        }
    });
    strObjects += '];';

    fs.writeFileSync(path + '/index.ts', strImports + EOL + strObjects, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function adaptToCLass(filename) {
    return filename.split('-').map(f => capitalizeFirstLetter(f)).join('')
    .split('.').map(f => capitalizeFirstLetter(f)).join('')
    .slice(0, -2);
}
