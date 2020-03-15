<template>
  <BaseDrop @drop="moveTaskOrColumn">
    <BaseDrag
      class="column"
      :transfer-data="{
        type: 'column',
        fromColumnIndex: columnIndex,
      }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <Task
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :board="board"
          :column="column"
          :column-index="columnIndex"
          :task-index="$taskIndex"
          :task="task"
        ></Task>
        <input
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task.."
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </BaseDrag>
  </BaseDrop>
</template>

<script>
import BaseDrag from './BaseDrag';
import BaseDrop from './BaseDrop';
import Task from './Task';
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin';

export default {
  components: {
    BaseDrag,
    BaseDrop,
    Task,
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value,
      });
      event.target.value = '';
    },
  },
};
</script>

<style lang="css" scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;

  min-width: 350px;
}
</style>
