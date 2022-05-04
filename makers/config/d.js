module.exports = [
    {
        folderOrigin: `${ __dirname }/../templates/d/`,
        fileOrigin: `entity.delete.handler.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/application/commands/`,
    },
    {
        folderOrigin: `${ __dirname }/../templates/d/`,
        fileOrigin: `entity.delete.command.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/application/commands/`,
    },
    {
        folderOrigin: `${ __dirname }/../templates/d/`,
        fileOrigin: `entity.delete.controller.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/infrastructure/api/controllers/`,
    },
    {
        folderOrigin: `${ __dirname }/../templates/`,
        fileOrigin: `entity.not-found.error.ts`,
        folderDestination: `${ __dirname }/../../src/###MODULE###/infrastructure/api/errors/`,
    }
]
