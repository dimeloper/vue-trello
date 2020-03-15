export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    moveTaskOrColumn(transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData);
      } else {
        this.moveColumn(transferData);
      }
    },
    moveColumn({fromColumnIndex}) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex,
      });
    },
    moveTask({fromColumnIndex, fromTaskIndex}) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks;

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks: this.column.tasks,
        toTaskIndex: this.taskIndex,
      });
    },
  },
};
