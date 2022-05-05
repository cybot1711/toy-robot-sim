import type { Choices, Modes, Orientation } from './types';

export const ORIENTATION: Array<Orientation> = ['WEST', 'NORTH', 'EAST', 'SOUTH'];
export const CHOICES: Array<Choices> = ['EXIT', 'REPORT', 'PLACE', 'MOVE', 'LEFT', 'RIGHT'];
export const MODES: Array<Modes> = ['interactive', 'classic', 'file']
