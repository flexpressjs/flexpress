import * as os from 'os';

import {ChainProjectLockBuilder} from './Lock/ProjectLockBuilder/ChainProjectLockBuilder';
import {YarnProjectLockBuilder} from './Lock/ProjectLockBuilder/YarnProjectLockBuilder';
import {ProjectBuilder} from './Project/ProjectBuilder';
import {NpmProjectLockBuilder} from './Lock/ProjectLockBuilder/NpmProjectLockBuilder';
import {FlexpressLockManager} from './Lock/FlexpressLockManager';
import {ApiClient} from './Api/ApiClient';
import {RecipesUpdater} from './Recipes/RecipesUpdater';
import {Logger} from './Logger/Logger';
import {RecipesApplier} from './Recipes/RecipesApplier';

const cachePath = os.homedir()+'/.flexpress';

const logger = new Logger();
const projectLockBuilder = new ChainProjectLockBuilder([new YarnProjectLockBuilder(), new NpmProjectLockBuilder()]);
const flexpressLockManager = new FlexpressLockManager();
const apiClient = new ApiClient();
const recipesUpdater = new RecipesUpdater(apiClient, cachePath, logger);
const recipesApplier = new RecipesApplier(cachePath);

export const run = async () => {
    logger.info('Reading your projects dependencies');
    const project = ProjectBuilder.createProjectFromStructure();
    const projectLock = projectLockBuilder.create(project.projectLockPath);
    const flexpressLock = flexpressLockManager.create(project.flexpressLockPath);

    logger.info('Updating recipes cache');
    const resolvedRecipes = await apiClient.resolveRecipes(projectLock.installed);
    await recipesUpdater.warmUpCache(resolvedRecipes);

    const toApply = recipesApplier.findRecipesToApply(resolvedRecipes, projectLock, flexpressLock);

    if (toApply.length === 0) {
        logger.success('Nothing to configure');
        return;
    }

    logger.success('Flexpress operations: '+toApply.length+' recipe'+(toApply.length > 1 ? 's' : ''));

    toApply.forEach(recipe => {
        logger.debug('  - Configuring '+recipe.dependency+' (>= '+recipe.version+') from recipe '+recipe.hash);
        recipesApplier.applyRecipe(project, recipe);
    });
};

/*

    const client = new Flexpress();

    const http = require('http');
    const fs = require('fs-extra');
    const chalk = require('chalk');
    const process = require('process');
    const write = console.log;

    const packageJsonPath = client.getPackagePath();

    const packageJson = require(packageJsonPath);

    const localDir = require('os').homedir()+'/.flexpress';

    write(chalk.yellow('Fetching Flexpress recipes ...'));
    fs.ensureDirSync(localDir);

    const file = fs.createWriteStream(localDir+'/recipes.zip');
    const request = http.get('http://github.com/flexpressjs/recipes/archive/master.zip', (res) => res.pipe(file));

    file.on('finish', () => {
        file.close();
    });
 */
