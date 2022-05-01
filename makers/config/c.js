module.exports = [
    {
        folderOrigin: `${ __dirname }/templates/c/`,
        fileOrigin: `entity.create.handler.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/commands/handlers/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/c/`,
        fileOrigin: `entity.create.command.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/commands/impl/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/c/`,
        fileOrigin: `entity.post.controller.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/api/controllers/`,
    },
    {
        folderOrigin: `${ __dirname }/templates/c/`,
        fileOrigin: `entity.post.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/api/dtos/`,
    }
]
