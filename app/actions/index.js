// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const READ_DATA = 'READ_DATA';

export function read() {
  return {
    type: READ_DATA
  };
}

