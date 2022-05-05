#!usr/bin/env node

import { checkInput, sleep } from './utils';
import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import type { Coordinates } from './types';
import { CHOICES, MODES, ORIENTATION } from './constants';
import type { Choices, Orientation } from './constants/types';
import { executeSpinner, logOutOfBoundsFault, logPlacementFault } from './helpers';

import fs from 'node:fs';
import readline from 'node:readline';

let input: Choices;
let mode: string;
let coordinates: Coordinates = { x: 0, y: 0, f: ORIENTATION[0] };
let hasPlacedRobot = false;

/**
 * A light introduction to the app.
 */
const intro = async () => {
  const title = chalkAnimation.karaoke('Toy Robot Simulator? \n');

  await sleep(2000);
  title.stop();

  console.log(`
    HOW TO PLAY
    ----------------------------------
    You can choose one of three modes:
    1. Interactive, where you can choose your commands from a list.
    2. Classic cli, where you can provide input as stdin on the cli.
    3. File input: Place a file called commands.txt with valid commands in the src folder. 
    Any errors will be highlighted in ${chalk.bgRed(' RED ')}
  `);
};

/**
 * Gets app mode
 */
const getMode = async () => {
  const answers = await inquirer.prompt({
    name: 'mode',
    type: 'list',
    message: 'Choose your mode:',
    choices: MODES,
    default() {
      return 'interactive';
    },
  });

  mode = answers.mode;
  await executeSpinner();
};

/**
 * Handles robot rotation
 * @param direction
 */
const handleRotate = (direction: string) => {
  if (direction === 'LEFT') {
    const index = ORIENTATION.indexOf(coordinates.f);

    if (index === 0) {
      coordinates.f = ORIENTATION[ORIENTATION.length - 1];
    } else {
      coordinates.f = ORIENTATION[index - 1];
    }
  }

  if (direction === 'RIGHT') {
    const index = ORIENTATION.indexOf(coordinates.f);

    if (index === 3) {
      coordinates.f = ORIENTATION[0];
    } else {
      coordinates.f = ORIENTATION[index + 1];
    }
  }
};

/**
 * Handles robot movement
 */
const handleMove = async () => {
  if (coordinates.f === 'NORTH') {
    return coordinates.y + 1 > 4 ? logOutOfBoundsFault() : (coordinates.y += 1);
  }
  if (coordinates.f === 'SOUTH') {
    return coordinates.y - 1 < 0 ? logOutOfBoundsFault() : (coordinates.y -= 1);
  }
  if (coordinates.f === 'EAST') {
    return coordinates.x + 1 > 4 ? logOutOfBoundsFault() : (coordinates.x += 1);
  }
  if (coordinates.f === 'WEST') {
    return coordinates.x - 1 < 0 ? logOutOfBoundsFault() : (coordinates.x -= 1);
  }

  return console.log(chalk.bgRed('Incorrect option selected'));
};

/**
 * Handles all valid cases for input
 * @param answer
 */
const handleInput = async (answer: string) => {
  if (answer === 'PLACE') {
    const placeAnswer = await inquirer.prompt({
      name: 'coordinates',
      type: 'input',
      message: 'Choose your coordinates',
      default() {
        return '0 0 NORTH';
      },
    });
    const coordinatesList: Array<string> = placeAnswer.coordinates.split(' ');

    if (coordinatesList.length !== 3) {
      return console.log(chalk.bgRedBright('You need to enter X Y and F'));
    }
    coordinates.x = +coordinatesList[0];
    coordinates.y = +coordinatesList[1];
    coordinates.f = coordinatesList[2] as Orientation;

    if (!checkInput(coordinates)) {
      // Reset coordinates if input is incorrect.
      coordinates = { x: 0, y: 0, f: 'NORTH' };

      return console.log(chalk.bgRedBright('Robotnik cannot understand your command bleep'));
    }

    hasPlacedRobot = true;
  }

  if (answer === 'REPORT') {
    return hasPlacedRobot
      ? console.log(chalk.bgGrey('ROBO Coordinates', coordinates.x, coordinates.y, coordinates.f))
      : logPlacementFault();
  }

  if (answer === 'MOVE') {
    return hasPlacedRobot ? await handleMove() : logPlacementFault();
  }

  if (answer === 'LEFT' || answer === 'RIGHT') {
    return hasPlacedRobot ?  handleRotate(answer) : logPlacementFault();
  }
};

/**
 * Gets all the input
 */
const getInput = async () => {
  const answers = await inquirer.prompt({
    name: 'operation',
    type: 'list',
    message: 'Choose your operation:',
    choices: CHOICES,
    default() {
      return 'REPORT';
    },
  });

  input = answers.operation;

  await handleInput(input);
};

/**
 * Gets single line input
 */
const getClassicInput = async () => {
  const answers = await inquirer.prompt({
    name: 'operation',
    type: 'input',
    message: 'Choose your operation:',
    default() {
      return 'REPORT';
    },
  });

  input = answers.operation;
  if (CHOICES.includes(input)) {
    await handleInput(input);
  } else {
    console.log(chalk.bgRed('Incorrect input'));
  }
};

/**
 * Gets file input line by line. This comes straight from the nodejs docs.
 * https://nodejs.org/api/readline.html#example-read-file-stream-line-by-line
 */
const getFileInput = async () => {
  const fileStream = fs.createReadStream('commands.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in command.txt will be successively available here as `line`.
    console.log(chalk.bgGrey(`Command from file ${line}`));

    input = line as Choices;
    if (CHOICES.includes(input)) {
      await handleInput(input);
      await sleep();
    } else {
      console.log(chalk.bgRed('Incorrect input'));
    }
  }
};

/**
 * Recursively calls executeGame until EXIT command has been received
 */
const executeGame = async () => {
  while (input !== 'EXIT') {
    if (mode === 'interactive') await getInput();
    if (mode === 'classic') await getClassicInput();
    if (mode === 'file') await getFileInput();

    await executeSpinner();
    await executeGame();
  }
  process.exit(0);
};

// Execute main
(async () => {
  await intro();
  await getMode();
  await executeGame();
})();
