import chalk from 'chalk';

export class Logger {
    public debug(message: string): void {
        console.log(message);
    }

    public info(message: string): void {
        console.log(chalk.yellow(message));
    }

    public success(message: string): void {
        console.log(chalk.green(message));
    }

    public error(message: string): void {
        console.log(chalk.white.bgRed(message));
    }
}
