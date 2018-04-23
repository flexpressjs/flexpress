"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const ChainProjectLockBuilder_1 = require("./Lock/ProjectLockBuilder/ChainProjectLockBuilder");
const YarnProjectLockBuilder_1 = require("./Lock/ProjectLockBuilder/YarnProjectLockBuilder");
const ProjectBuilder_1 = require("./Project/ProjectBuilder");
const NpmProjectLockBuilder_1 = require("./Lock/ProjectLockBuilder/NpmProjectLockBuilder");
const FlexpressLockManager_1 = require("./Lock/FlexpressLockManager");
const ApiClient_1 = require("./Api/ApiClient");
const RecipesUpdater_1 = require("./Recipes/RecipesUpdater");
const Logger_1 = require("./Logger/Logger");
const RecipesApplier_1 = require("./Recipes/RecipesApplier");
const cachePath = os.homedir() + '/.flexpress';
const logger = new Logger_1.Logger();
const projectLockBuilder = new ChainProjectLockBuilder_1.ChainProjectLockBuilder([new YarnProjectLockBuilder_1.YarnProjectLockBuilder(), new NpmProjectLockBuilder_1.NpmProjectLockBuilder()]);
const flexpressLockManager = new FlexpressLockManager_1.FlexpressLockManager();
const apiClient = new ApiClient_1.ApiClient();
const recipesUpdater = new RecipesUpdater_1.RecipesUpdater(apiClient, cachePath, logger);
const recipesApplier = new RecipesApplier_1.RecipesApplier(cachePath, logger);
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    logger.info('\n\nReading your projects dependencies');
    const project = ProjectBuilder_1.ProjectBuilder.createProjectFromStructure();
    const projectLock = projectLockBuilder.create(project.projectLockPath);
    const flexpressLock = flexpressLockManager.create(project.flexpressLockPath);
    logger.info('Resolving recipes');
    const resolvedRecipes = yield apiClient.resolveRecipes(projectLock.installed);
    yield recipesUpdater.warmUpCache(resolvedRecipes);
    const toApply = recipesApplier.findRecipesToApply(resolvedRecipes, projectLock, flexpressLock);
    if (toApply.length === 0) {
        logger.success('Flexpress has nothing to configure');
        return;
    }
    logger.success('Flexpress operations: ' + toApply.length + ' recipe' + (toApply.length > 1 ? 's' : ''));
    const postInstallOutput = recipesApplier.applyRecipes(project, toApply);
    flexpressLockManager.persist(project.flexpressLockPath, projectLock);
    logger.success('\nSome files may have been created or updated to configure your new packages.');
    logger.success('Please review, edit and commit them: these files are yours.\n');
    if (postInstallOutput) {
        logger.info(postInstallOutput);
    }
});
//# sourceMappingURL=flexpress.js.map