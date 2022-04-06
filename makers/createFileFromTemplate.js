const fs = require("fs");
const { clc } = require("@nestjs/common/utils/cli-colors.util");
const adaptTemplate = require("./adaptTemplate");

module.exports = function createFileFromTemplate(templatePath,fileDestinationFullPath,entityName){

    // Vérification que le fichier n'existe pas déjà
    if (fs.existsSync(fileDestinationFullPath)) {
        console.error(clc.yellow(`Le fichier ${ fileDestinationFullPath } existe déjà.`));
        return;
    }

    // Transform the content of template
    const contents = adaptTemplate(templatePath, entityName);

    // Create the file
    fs.writeFile(fileDestinationFullPath, contents, (err) => {
        if (err) throw err;

        console.log(clc.cyanBright(`Le fichier ${ fileDestinationFullPath } a été créé !`));
    });
}
