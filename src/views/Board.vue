<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <Column
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :board="board"
        :column="column"
        :column-index="$columnIndex"
      ></Column>

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
import Column from '../components/Column';

export default {
  components: {
    Column,
  },
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
  },
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;

  background: rgba(0, 0, 0, 0.5);
}
</style>
