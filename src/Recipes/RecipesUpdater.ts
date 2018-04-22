import * as fs from 'fs-extra';
import * as AdmZip from 'adm-zip';

import {ResolvedRecipe} from '../types';
import {ApiClient} from '../Api/ApiClient';
import {Logger} from '../Logger/Logger';

export class RecipesUpdater {
    private apiClient: ApiClient;
    private cachePath: string;
    private logger: Logger;

    constructor(apiClient: ApiClient, cachePath: string, logger: Logger) {
        this.apiClient = apiClient;
        this.cachePath = cachePath;
        this.logger = logger;

        fs.ensureDirSync(this.cachePath);
    }

    public warmUpCache(recipes: ResolvedRecipe[]): Promise<void[]> {
        let queries: Promise<void>[] = [];
        let count = 0;

        recipes.forEach(recipe => {
            const recipeCacheDir = this.cachePath+'/'+recipe.dependency+'/'+recipe.version;
            const recipeArchivePath = recipeCacheDir+'/archive.zip';
            const hashFilePath = recipeCacheDir+'/hash';

            if (fs.existsSync(hashFilePath) && fs.readFileSync(hashFilePath, { encoding: 'utf8' }) === recipe.hash) {
                return;
            }

            count++;

            queries.push(new Promise<void>((resolve, reject) => {
                this.apiClient.downloadArchive(recipe)
                    .then((content) => {
                        fs.ensureDirSync(recipeCacheDir);
                        fs.writeFileSync(recipeArchivePath, content);
                        fs.writeFileSync(hashFilePath, recipe.hash);

                        const zip = new AdmZip(recipeArchivePath);
                        zip.extractAllTo(recipeCacheDir);
                    })
                    .catch((err) => {
                        throw new Error('Recipe '+recipe.archive+' could not be downloaded. (error: '+err+')');
                    })
            }));
        });

        if (count > 0) {
            this.logger.info('Downloading '+count+' recipe'+(count > 1 ? 's' : ''));
        }

        return Promise.all(queries);
    }
}
