const fs = require("fs");
module.exports = function adaptTemplate(templatePath,entityName){
    return fs.readFileSync(templatePath).toString()
    .replaceAll('###entity-tiret###', entityName.tiret)
    .replaceAll('###Entity###', entityName.CamelCase)
    .replaceAll('###entityCase###', entityName.cC)
    .replaceAll('###ENTITY_CAPITALIZE###', entityName.CAPITALIZE);

}
