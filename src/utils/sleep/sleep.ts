import { type Sleep } from './types';

export const sleep: Sleep = (ms = 1000) => new Promise(r => setTimeout(r, ms));
