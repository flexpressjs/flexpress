"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const FlexpressLock_1 = require("./FlexpressLock");
class FlexpressLockManager {
    create(filename) {
        if (!fs.existsSync(filename)) {
            return new FlexpressLock_1.FlexpressLock(filename, {});
        }
        return new FlexpressLock_1.FlexpressLock(filename, fs.readJSONSync(filename));
    }
    persist(filename, lock) {
        fs.writeJSONSync(filename, lock.installed);
    }
}
exports.FlexpressLockManager = FlexpressLockManager;
//# sourceMappingURL=FlexpressLockManager.js.map