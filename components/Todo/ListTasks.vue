<template>
  <div>
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
    <!-- Button Done Sorting  -->
    <button-done-sorting v-if="$store.state.sorting"></button-done-sorting>
  </div>
</template>

<script>
import ButtonDoneSorting from './ButtonDoneSorting.vue'
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem, ButtonDoneSorting },
}
</script>
