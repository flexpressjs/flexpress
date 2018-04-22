"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainProjectLockBuilder {
    constructor(projectLockBuilders) {
        this.projectLockBuilders = projectLockBuilders;
    }
    supports(filename) {
        for (let i in this.projectLockBuilders) {
            if (this.projectLockBuilders[i].supports(filename)) {
                return true;
            }
        }
        return false;
    }
    create(filename) {
        for (let i in this.projectLockBuilders) {
            if (this.projectLockBuilders[i].supports(filename)) {
                return this.projectLockBuilders[i].create(filename);
            }
        }
        throw new Error('No project lock builder was found to parse file "' + filename + '"');
    }
}
exports.ChainProjectLockBuilder = ChainProjectLockBuilder;
//# sourceMappingURL=ChainProjectLockBuilder.js.map