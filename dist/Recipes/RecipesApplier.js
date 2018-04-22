"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
class RecipesApplier {
    constructor(cachePath, logger) {
        this.cachePath = cachePath;
        this.logger = logger;
    }
    findRecipesToApply(recipes, projectLock, flexpressLock) {
        let newPackages = {};
        for (let pkgName in projectLock.installed) {
            if (!flexpressLock.isConfigured(pkgName)) {
                newPackages[pkgName] = true;
            }
        }
        let toApply = [];
        recipes.forEach(recipe => {
            if (typeof newPackages[recipe.dependency] !== 'undefined') {
                toApply.push(recipe);
            }
        });
        return toApply;
    }
    applyRecipes(project, recipes) {
        let postInstallOutput = [];
        recipes.forEach(recipe => {
            const recipeCacheDir = this.cachePath + '/' + recipe.dependency + '/' + recipe.version;
            this.logger.debug('  - Configuring ' + recipe.dependency + ' (>= ' + recipe.version + ') from recipe ' + recipe.hash);
            const manifest = require(recipeCacheDir + '/manifest.json');
            if (typeof manifest.copy !== 'undefined') {
                for (let from in manifest.copy) {
                    const to = project.rootPath + '/' + manifest.copy[from];
                    from = recipeCacheDir + '/' + from;
                    fs.ensureDirSync(path.dirname(to));
                    fs.copyFileSync(from, to);
                }
            }
            if (typeof manifest.postInstallOutput !== 'undefined' && fs.existsSync(recipeCacheDir + '/' + manifest.postInstallOutput)) {
                postInstallOutput.push(fs.readFileSync(recipeCacheDir + '/' + manifest.postInstallOutput, { encoding: 'utf8' }));
            }
        });
        return postInstallOutput.join("\n");
    }
}
exports.RecipesApplier = RecipesApplier;
//# sourceMappingURL=RecipesApplier.js.map