const CONFIG_G = require("./config/g");
const CONFIG_GBI = require("./config/gbi");
const CONFIG_D = require("./config/d");
const CONFIG_U = require("./config/u");
const CONFIG_C = require("./config/c");
const CONFIG_R = require("./config/r");

const { clc } = require("@nestjs/common/utils/cli-colors.util");
const fs = require("fs");
const generateGenericExceptions = require('./generateGenericExceptions');
const createFileFromTemplate = require('./createFileFromTemplate');
const generateIndexes = require('./generateIndexes');
const capitalizeFirstLetter = require('./capitalizeFirstLetter');

const dicoGenerate = {
    'r': CONFIG_R,
    'c': CONFIG_C,
    'u': CONFIG_U,
    'd': CONFIG_D,
    'g': CONFIG_G,
    'gbi': CONFIG_GBI
}

function run() {
    try {
        const params = parseParams();

        if (params.actions !== 'gen-indexes') {
            generateGenericExceptions(params.module, params.entityName);

            params.actions.forEach(action => {
                generateForAction(action, params.entityName, params.module)
            });
        }

        generateIndexes(params.module);

    } catch (e) {
        console.error(clc.red(e.message));
    }
}

function generateForAction(action, entityName, module) {

    if (dicoGenerate[action] === undefined) {
        console.error(clc.red(`L'action ${ action } n'a pas été définie`));
        return;
    }

    dicoGenerate[action].forEach(({
                                      folderOrigin,
                                      fileOrigin,
                                      folderDestination,
                                      createEntityFolder = true
                                  }) => {

        const fileDestination = fileOrigin.replaceAll('entity', entityName.tiret);
        folderDestination = folderDestination.replaceAll('###MODULE###', module);

        if (createEntityFolder
            && !fs.existsSync(folderDestination + entityName.tiret)
        ) {
            fs.mkdirSync(folderDestination + entityName.tiret, err => {
                if (err) {
                    console.error('Err', err);
                }
                console.log(clc.cyanBright(`Le dossier ${ folderDestination + entityName.tiret } a été créé.`));
            });
        }

        const filePathDestination = createEntityFolder ? folderDestination + entityName.tiret + '/' + fileDestination : folderDestination + '/' + fileDestination;

        createFileFromTemplate(
            folderOrigin + fileOrigin,
            filePathDestination,
            entityName
        );
    })

}

/**
 * param[0] = module
 * param[1] = entity / direct action like gen-indexes
 * param[2] = actions
 * @return {{entityName: {cC: string, CAPITALIZE: string, tiret: string, CamelCase: string}, module: string, actions: string[]}}
 */
function parseParams() {
    const params = process.argv.slice(2);
    if (!params[0] || !params[1]) {
        throw Error('Il manque des paramètres.');
    }

    const CamelCase = params[1].split('-').map(word => capitalizeFirstLetter(word)).join('');
    const cC = params[1].split('-').map((word, index) => index != 0 ? capitalizeFirstLetter(word) : word).join('');
    const CAPITALIZE = params[1].split('-').map(word => word.toUpperCase()).join('_');

    let actions = '';
    if (params[1] === 'gen-indexes') {
        actions = 'gen-indexes';
    } else {
        actions = params[2] === 'a' ? Object.keys(dicoGenerate) : params[2].split(',');
    }

    return {
        module: params[0],
        entityName: {
            tiret: params[1], cC, CamelCase, CAPITALIZE
        },
        actions
    }


}

run();
