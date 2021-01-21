<template>
  <v-card>
    <v-divider></v-divider>

    <!-- Task List Item -->
    <task-item
      v-for="task in $store.getters.filteredTask"
      :key="task.id"
      :task="task"
    ></task-item>

    <v-divider></v-divider>
  </v-card>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
}
</script>
