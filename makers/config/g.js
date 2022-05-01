module.exports = [
    {
        folderOrigin: `${ __dirname }/templates/g/`,
        fileOrigin: `entity.get.controller.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/api/controllers/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/g/`,
        fileOrigin: `entity.get.handler.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/services/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/g/`,
        fileOrigin: `entity.get.query.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/services/`,
    },
]
