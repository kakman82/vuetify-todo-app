<template>
  <div>
    <v-container>
      <v-btn
        v-if="!showButton"
        class="mb-3"
        @click="showButton = !showButton"
        block
        color="pink"
      >
        <v-icon left> mdi-calendar-plus </v-icon>
        {{ $t('button.form.new') }}
      </v-btn>

      <v-btn
        v-if="showButton"
        class="mb-3"
        @click="showButton = !showButton"
        block
        color="pink"
      >
        <v-icon left> mdi-close-circle </v-icon>
        {{ $t('button.form.close') }}
      </v-btn>

      <!-- Todo Form -->
      <todo-form
        v-if="showButton"
        @save-todo="addTodo"
        class="mb-3"
      ></todo-form>

      <v-divider></v-divider>
    </v-container>
    <v-container v-if="getTasks.length">
      <!-- Search Field -->
      <!-- <search class="my-n5" width="500px"></search> -->
      <search class="d-flex my-n2"></search>

      <!-- Todo Header and Search Button -->

      <h3 v-if="getTasks.length" class="mb-3">
        <v-icon left> mdi-format-list-checks </v-icon>
        {{ $t('listName') }}
      </h3>
      <v-spacer></v-spacer>

      <!-- List of tasks -->
      <list-tasks></list-tasks>
    </v-container>
    <!-- No Tasks View-->
    <no-tasks v-if="!getTasks.length"></no-tasks>
  </div>
</template>

<script>
import TodoForm from '../components/Todo/TodoForm'
import TodoModal from '../components/Todo/TodoModal'
import ListTasks from '../components/Todo/ListTasks'
import NoTasks from '../components/Todo/NoTasks'
import Search from '../components/Tools/Search'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: { TodoForm, TodoModal, ListTasks, NoTasks, Search },
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
    pageTitle() {
      // dile göre title adı vermek için computed kullandım
      return this.$i18n.locale === 'tr'
        ? 'Yap. Uyg. | Ana Sayfa'
        : 'Todo App | Home Page'
    },
  },
  head() {
    return {
      // titleTemplate: `%s | ${this.pageTitle}`,
      // title direkt olarak tam adı verilen değer yapıyor - titleTemplate ile bu formatta yapmak mümkün : Kerem Todo | Hakkımızda gibi ama burada Kerem Todo titleTemplate olarak global tanımladığı için hem tr hem de eng de anısı gelir fakat computed daki gibi tanım olursa dile göre istediğimiz title gelir
      title: this.pageTitle,
    }
  },

  methods: {
    addTodo(emitTodo) {
      this.$store.dispatch('addTask', emitTodo)
      this.showButton = false
    },
  },
}
</script>
