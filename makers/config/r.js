module.exports = [
    {
        createEntityFolder: false,
        folderOrigin: `${ __dirname }/templates/r/`,
        fileOrigin: `entity.repository.interface.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/application/repositories/`,
    },
    {
        createEntityFolder: false,
        folderOrigin: `${ __dirname }/templates/r/`,
        fileOrigin: `entity.repository.ts`,
        folderDestination: `${ __dirname }/../src/###MODULE###/infrastructure/database/repositories/`,
    },
]
