<template>
  <v-container>
    <div class="container">
      <h1 class="title">{{ $t('listName') }}</h1>
      <!-- some code -->
    </div>
    <v-btn
      v-if="!showButton"
      class="mb-3"
      @click="showButton = !showButton"
      block
      color="pink"
    >
      <v-icon left> mdi-calendar-plus </v-icon>
      Add New
    </v-btn>

    <v-btn
      v-if="showButton"
      class="mb-3"
      @click="showButton = !showButton"
      block
      color="pink"
    >
      <v-icon left> mdi-close-circle </v-icon>
      Close
    </v-btn>

    <!-- Todo Form -->
    <todo-form v-if="showButton" @save-todo="addTodo" class="mb-5"></todo-form>
    <v-spacer></v-spacer>

    <h3 v-if="getTasks.length" class="mb-3">
      <v-icon left> mdi-format-list-checks </v-icon>
      Todo List
    </h3>
    <!-- No Tasks View-->
    <no-tasks v-else></no-tasks>

    <!-- List of tasks -->
    <list-tasks></list-tasks>
  </v-container>
</template>

<script>
import TodoForm from '../components/Todo/TodoForm'
import TodoModal from '../components/Todo/TodoModal'
import ListTasks from '../components/Todo/ListTasks'
import NoTasks from '../components/Todo/NoTasks'
import { mapGetters } from 'vuex'

export default {
  components: { TodoForm, TodoModal, ListTasks, NoTasks },
  data() {
    return {
      showButton: false,
    }
  },
  computed: {
    //...mapGetters(['getTasks']),
    getTasks() {
      return this.$store.state.tasks
    },
  },
  methods: {
    addTodo(emitTodo) {
      //const message = 'Todo added successfully!'
      this.$store.dispatch('addTask', emitTodo)
      this.showButton = false
    },
  },
}
</script>
