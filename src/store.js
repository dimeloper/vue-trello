import Vue from 'vue';
import Vuex from 'vuex';
import defaultBoard from './default-board';
import {saveStatePlugin} from './utils';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {},
  plugins: [saveStatePlugin],
  state: {
    board,
  },
});
