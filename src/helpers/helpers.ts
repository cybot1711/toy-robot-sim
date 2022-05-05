import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import { sleep } from '../utils';

export const logPlacementFault = async () => {
  console.log(chalk.bgRed('Robot has not been placed yet'));
};

export const logOutOfBoundsFault = async () => {
  console.log(chalk.bgRedBright('Robotnik cannot understand your command bleep'));
};

export const executeSpinner = async () => {
  const spinner = createSpinner('Working...\n').start();
  await sleep();
  spinner.success({ text: 'Computed....' });
};
