import http from 'http';
import fs from 'fs-extra';
import chalk from 'chalk';
import process from 'process';

export class Flexpress {
    public getPackagePath(): string {
        const packageJsonPath = require('pkg-up').sync();

        if (packageJsonPath) {
            throw new Error('Your package.json file has not been found. Are you sure you are located in a proper Node.js project?');
        }

        return packageJsonPath;
    }

    private log(message: any) {
        console.log(message);
    }
}
