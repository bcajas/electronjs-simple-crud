// @flow
import { READ_DATA } from '../actions';

const { ipcRenderer } = window.require('electron');
const initialState = { data: [] };

export default function counter(state = initialState, action) {
  switch (action.type) {
    case READ_DATA:
      const data = ipcRenderer.sendSync('fetchDataRequest');
      return {
        ...state,
        data: data
      };
    default:
      return state;
  }
}
