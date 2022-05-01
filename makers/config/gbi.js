module.exports = [
    {
        folderOrigin: `${ __dirname }/../templates/gbi/`,
        fileOrigin: `entity.get-by-id.controller.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/infrastructure/api/controllers/`,
    },
    {
        folderOrigin: `${ __dirname }/../templates/gbi/`,
        fileOrigin: `entity.get-by-id.handler.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/application/queries/`,
    },
    {
        folderOrigin: `${ __dirname }/../templates/gbi/`,
        fileOrigin: `entity.get-by-id.query.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/application/queries/`,
    }
]
