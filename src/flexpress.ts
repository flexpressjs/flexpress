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
const recipesApplier = new RecipesApplier(cachePath, logger);

export const run = async () => {
    logger.info('\n\nReading your projects dependencies');
    const project = ProjectBuilder.createProjectFromStructure();
    const projectLock = projectLockBuilder.create(project.projectLockPath);
    const flexpressLock = flexpressLockManager.create(project.flexpressLockPath);

    logger.info('Resolving recipes');
    const resolvedRecipes = await apiClient.resolveRecipes(projectLock.installed);
    await recipesUpdater.warmUpCache(resolvedRecipes);

    const toApply = recipesApplier.findRecipesToApply(resolvedRecipes, projectLock, flexpressLock);

    if (toApply.length === 0) {
        logger.success('Flexpress has nothing to configure');
        return;
    }

    logger.success('Flexpress operations: '+toApply.length+' recipe'+(toApply.length > 1 ? 's' : ''));
    const postInstallOutput = recipesApplier.applyRecipes(project, toApply);

    flexpressLockManager.persist(project.flexpressLockPath, projectLock);

    logger.success('\nSome files may have been created or updated to configure your new packages.');
    logger.success('Please review, edit and commit them: these files are yours.\n');

    if (postInstallOutput) {
        logger.info(postInstallOutput);
    }
};
