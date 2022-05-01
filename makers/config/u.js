module.exports = [
    {
        folderOrigin: `${ __dirname }/templates/u/`,
        fileOrigin: `entity.update.handler.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/commands/handlers/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/u/`,
        fileOrigin: `entity.update.command.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/commands/impl/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/u/`,
        fileOrigin: `entity.put.controller.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/api/controllers/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/u/`,
        fileOrigin: `entity.put.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/api/dtos/`,
    }
]
