import * as fs from 'fs-extra';
import * as path from 'path';

import {Project} from '../Project/Project';
import {ProjectLock} from '../Lock/ProjectLock';
import {FlexpressLock} from '../Lock/FlexpressLock';
import {Manifest, ResolvedRecipe} from '../types';
import {Logger} from '../Logger/Logger';

export class RecipesApplier {
    private cachePath: string;
    private logger: Logger;

    constructor(cachePath: string, logger: Logger) {
        this.cachePath = cachePath;
        this.logger = logger;
    }

    public findRecipesToApply(recipes: ResolvedRecipe[], projectLock: ProjectLock, flexpressLock: FlexpressLock): ResolvedRecipe[] {
        let newPackages: { [key: string]: boolean } = {};
        for (let pkgName in projectLock.installed) {
            if (!flexpressLock.isConfigured(pkgName)) {
                newPackages[pkgName] = true;
            }
        }

        let toApply: ResolvedRecipe[] = [];
        recipes.forEach(recipe => {
            if (typeof newPackages[recipe.dependency] !== 'undefined') {
                toApply.push(recipe);
            }
        });

        return toApply;
    }

    public applyRecipes(project: Project, recipes: ResolvedRecipe[]): string {
        let postInstallOutput: string[] = [];

        recipes.forEach(recipe => {const recipeCacheDir = this.cachePath+'/'+recipe.dependency+'/'+recipe.version;
            this.logger.debug('  - Configuring '+recipe.dependency+' (>= '+recipe.version+') from recipe '+recipe.hash);

            const manifest: Manifest = require(recipeCacheDir+'/manifest.json');

            if (typeof manifest.copy !== 'undefined') {
                for (let from in manifest.copy) {
                    const to = project.rootPath+'/'+manifest.copy[from];
                    from = recipeCacheDir+'/'+from;

                    fs.ensureDirSync(path.dirname(to));
                    fs.copyFileSync(from, to);
                }
            }

            if (typeof manifest.postInstallOutput !== 'undefined' && fs.existsSync(recipeCacheDir+'/'+manifest.postInstallOutput)) {
                postInstallOutput.push(fs.readFileSync(recipeCacheDir+'/'+manifest.postInstallOutput, { encoding: 'utf8' }));
            }
        });

        return postInstallOutput.join("\n");
    }
}
