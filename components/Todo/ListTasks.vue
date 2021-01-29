<template>
  <div>
    <v-card>
      <v-divider></v-divider>

      <!-- Task List Item -->
      <draggable v-model="tasks" handle=".handle">
        <task-item
          v-for="task in $store.getters.filteredTask"
          :key="task.id"
          :task="task"
        ></task-item>
      </draggable>

      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem, draggable },
  // draggable ile sıralamaları yaptıktan sonra store daki sıralamayı da değiştirmek için bu get ve set tanımını yaptık
  // bu yöntem https://github.com/SortableJS/Vue.Draggable sitesinde vuex başlığı altında yer alıyor
  // updateStoreAfterDragging ismini verdiğim mutation aracılığı ile state deki sıralama kalıcı olmuş olacak bu sayede
  computed: {
    tasks: {
      get() {
        return this.$store.getters.filteredTask
      },
      set(value) {
        return this.$store.commit('setTasks', value)
      },
    },
  },
}
</script>
