<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        class="column"
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            class="task"
            @click="goToTask(task.id)"
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
        </div>
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
    goToTask(taskId) {
      this.$router.push({name: 'task', params: {id: taskId}});
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
