import { type CheckInput } from './types';
import { checkCoordinates } from '../checkCoordinates';

export const checkInput: CheckInput = ({ x, y, f }) =>
  checkCoordinates(x, y) && typeof x === 'number' && typeof y === 'number' && typeof f === 'string';
