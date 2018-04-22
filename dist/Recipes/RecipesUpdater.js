"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const AdmZip = require("adm-zip");
class RecipesUpdater {
    constructor(apiClient, cachePath, logger) {
        this.apiClient = apiClient;
        this.cachePath = cachePath;
        this.logger = logger;
        fs.ensureDirSync(this.cachePath);
    }
    warmUpCache(recipes) {
        let queries = [];
        let count = 0;
        recipes.forEach(recipe => {
            const recipeCacheDir = this.cachePath + '/' + recipe.dependency + '/' + recipe.version;
            const recipeArchivePath = recipeCacheDir + '/archive.zip';
            const hashFilePath = recipeCacheDir + '/hash';
            if (fs.existsSync(hashFilePath) && fs.readFileSync(hashFilePath, { encoding: 'utf8' }) === recipe.hash) {
                return;
            }
            count++;
            queries.push(new Promise((resolve, reject) => {
                this.apiClient.downloadArchive(recipe)
                    .then((content) => {
                    fs.ensureDirSync(recipeCacheDir);
                    fs.writeFileSync(recipeArchivePath, content);
                    fs.writeFileSync(hashFilePath, recipe.hash);
                    const zip = new AdmZip(recipeArchivePath);
                    zip.extractAllTo(recipeCacheDir);
                })
                    .catch((err) => {
                    throw new Error('Recipe ' + recipe.archive + ' could not be downloaded. (error: ' + err + ')');
                });
            }));
        });
        if (count > 0) {
            this.logger.info('Downloading ' + count + ' recipe' + (count > 1 ? 's' : ''));
        }
        return Promise.all(queries);
    }
}
exports.RecipesUpdater = RecipesUpdater;
//# sourceMappingURL=RecipesUpdater.js.map