<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        class="column"
        draggable
        @dragstart.self="pickupColumn($event, $columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            class="task"
            draggable
            @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
            @click="goToTask(task.id)"
            @drop.stop="
              moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)
            "
            @dragover.prevent
            @dragenter.prevent
          >
            <span class="w-full flex-no-shrink font-bold">
              {{ task.name }}
            </span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 text-sm"
            >
              {{ task.description }}
            </p>
          </div>
          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task.."
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>

      <div class="column flex">
        <input
          v-model="newColumnName"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column.."
          type="text"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div v-if="isTaskOpen" class="task-bg" @click.self="closeModal">
      <router-view />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      newColumnName: '',
    };
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task';
    },
  },
  methods: {
    closeModal() {
      this.$router.push({name: 'board'});
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName,
      });
      this.newColumnName = '';
    },
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value,
      });
      event.target.value = '';
    },
    goToTask(taskId) {
      this.$router.push({name: 'task', params: {id: taskId}});
    },
    moveTaskOrColumn(event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type');
      if (type === 'task') {
        this.moveTask(
          event,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        );
      } else {
        this.moveColumn(event, toColumnIndex);
      }
    },
    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index');
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      });
    },
    moveTask(event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index');
      const fromTasks = this.board.columns[fromColumnIndex].tasks;
      const fromTaskIndex = event.dataTransfer.getData('from-task-index');

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex,
      });
    },
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData('from-column-index', fromColumnIndex);
      event.dataTransfer.setData('type', 'column');
    },
    pickupTask(event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData('from-task-index', taskIndex);
      event.dataTransfer.setData('from-column-index', fromColumnIndex);
      event.dataTransfer.setData('type', 'task');
    },
  },
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;

  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;

  background: rgba(0, 0, 0, 0.5);
}
</style>
