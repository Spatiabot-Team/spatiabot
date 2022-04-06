const fs = require("fs");
const createFileFromTemplate = require('./createFileFromTemplate');
const { clc } = require("@nestjs/common/utils/cli-colors.util");

const folderException = `${ __dirname }/../src/SPATIABOT/domain/exceptions/`;

const exceptionsToCreate = [
    'entity.not-found.exception.ts'
];

module.exports = function generateGenericExceptions(module,entityName) {

    if (!fs.existsSync(folderException + entityName.tiret)) {
        console.log('Create folder ', folderException + entityName.tiret)

        fs.mkdirSync(folderException + entityName.tiret, err => {
            if (err) {
                console.error('Err', err);
            }
            console.log(clc.cyanBright(`Le dossier ${ folderException + entityName.tiret } a été créé.`));
        });
    }

    exceptionsToCreate.forEach(templateName => {
        let fileDestinationFullPath = folderException + entityName.tiret + '/' + templateName.replaceAll('entity',entityName.tiret);
        fileDestinationFullPath = fileDestinationFullPath.replaceAll('###MODULE###',module);
        createFileFromTemplate(
            __dirname + '/templates/' + templateName,
            fileDestinationFullPath,
            entityName
        );
    });
}
