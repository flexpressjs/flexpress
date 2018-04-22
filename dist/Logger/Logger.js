"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Logger {
    debug(message) {
        console.log(message);
    }
    info(message) {
        console.log(chalk_1.default.yellow(message));
    }
    success(message) {
        console.log(chalk_1.default.green(message));
    }
    error(message) {
        console.log(chalk_1.default.white.bgRed(message));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map