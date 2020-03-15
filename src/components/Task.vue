<template>
  <BaseDrop @drop="moveTaskOrColumn">
    <BaseDrag
      class="task"
      :transfer-data="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex,
      }"
      @click="goToTask(task.id)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </BaseDrag>
  </BaseDrop>
</template>

<script>
import movingTasksAndColumnsMixin from '../mixins/movingTasksAndColumnsMixin';
import BaseDrag from './BaseDrag';
import BaseDrop from './BaseDrop';

export default {
  components: {
    BaseDrag,
    BaseDrop,
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToTask(taskId) {
      this.$router.push({name: 'task', params: {id: taskId}});
    },
  },
};
</script>

<style lang="css" scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
