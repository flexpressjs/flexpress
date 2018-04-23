"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
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
            // Copy files
            if (typeof manifest.copy !== 'undefined') {
                for (let from in manifest.copy) {
                    const to = project.rootPath + '/' + manifest.copy[from];
                    from = recipeCacheDir + '/' + from;
                    //fs.ensureDirSync(path.dirname(to));
                    //fs.copyFileSync(from, to);
                }
            }
            // Create/update gitignore
            if (typeof manifest.gitignore !== 'undefined') {
                const gitignorePath = project.rootPath + '/.gitignore';
                fs.ensureFileSync(gitignorePath);
                let gitignore = fs.readFileSync(gitignorePath, { encoding: 'utf8' });
                const regex = new RegExp('###> ' + recipe.dependency + ' ###([\\s\\S]+)###< ' + recipe.dependency + ' ###', 'im');
                const recipeGitignore = [];
                recipeGitignore.push('###> ' + recipe.dependency + ' ###');
                for (let i in manifest.gitignore) {
                    recipeGitignore.push(manifest.gitignore[i]);
                }
                recipeGitignore.push('###< ' + recipe.dependency + ' ###');
                if (gitignore.match(regex)) {
                    gitignore = gitignore.replace(regex, recipeGitignore.join('\n'));
                }
                else {
                    gitignore += '\n\n' + recipeGitignore.join('\n');
                }
                fs.writeFileSync(gitignorePath, gitignore);
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