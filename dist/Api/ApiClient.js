"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class ApiClient {
    resolveRecipes(installed) {
        return new Promise((resolve, reject) => {
            axios_1.default.post('https://flexpress.titouangalopin.com/resolve', installed)
                .then((response) => resolve(response.data))
                .catch(reject);
        });
    }
    downloadArchive(resolvedRecipe) {
        return new Promise((resolve, reject) => {
            axios_1.default.get('https://flexpress.titouangalopin.com//archives/' + resolvedRecipe.archive, { responseType: 'arraybuffer' })
                .then((response) => resolve(response.data))
                .catch(reject);
        });
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=ApiClient.js.map