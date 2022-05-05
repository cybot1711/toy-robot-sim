# Toy Robot Simulator

> NodeJS v14.7.6 command line application written in Typescript
> Formatted with Prettier and linted with ESLint. Combined config.

## Installation instructions

> After cloning the repo run `yarn|yarn install` or `npm i` whichever you choose.


## Available scripts

```shell
yarn start -> This will run the application
yarn lint -> This will run basic lint on the source files
yarn lint:fix -> This will fix linting and formating issues
yarn test -> run unit tests with coverage
yarn test:watch -> run unit tests in watch mode
```

## Available interactive or command line commands
```text
PLACE -> will always prompt for coordinates and orientation x y f
MOVE -> will move one unit in the orientated direction
LEFT -> will rotate robot 90 degrees to the left
RIGHT -> will rotate robot 90 degrees to the right
REPORT -> will log out the current coordinates
EXIT -> will close the application
```
Note that the user will be informed of unsupported operations as long as the application is running  
The robot should never be able to move out of bounds.
A file *commands.txt* is included in the app root with a list of commands that can be changed.  


https://user-images.githubusercontent.com/8877178/166869156-85d238fa-245e-456e-9163-fe1abac47d30.mp4

