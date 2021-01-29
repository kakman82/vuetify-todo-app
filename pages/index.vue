<template>
  <div>
    <!-- Todo Form -->
    <todo-form class="mb-3"></todo-form>

    <v-container v-if="getTasks.length">
      <!-- Search Field -->
      <search class="d-flex mt-n6"></search>

      <!-- Todo Header and Search Button yerine VuetifyTodo daki kullandım-->

      <progress-tasks></progress-tasks>

      <!-- List of tasks -->
      <list-tasks></list-tasks>
      <!-- list-tasks ilk yaptığım idi vuetifydaki güzeldi bunu ekledim sonra design ile ilgili bi ton sorun çıktı vazgeçtim -->
      <!-- <vuetify-todo></vuetify-todo> -->
    </v-container>
    <!-- No Tasks View-->
    <no-tasks v-if="!getTasks.length"></no-tasks>

    <!-- Button Done Sorting  -->
    <button-done-sorting v-if="$store.state.sorting"></button-done-sorting>
  </div>
</template>

<script>
import TodoForm from '../components/Todo/TodoForm'
import TodoModal from '../components/Todo/TodoModal'
import ListTasks from '../components/Todo/ListTasks'
import NoTasks from '../components/Todo/NoTasks'
import Search from '../components/Tools/Search'
import ButtonDoneSorting from '../components/Todo/ButtonDoneSorting'
import VuetifyTodo from '../components/Todo/VuetifyTodo.vue'
import ProgressTasks from '../components/Todo/ProgressTasks.vue'

export default {
  name: 'index',
  components: {
    TodoForm,
    TodoModal,
    ListTasks,
    NoTasks,
    Search,
    ButtonDoneSorting,
    VuetifyTodo,
    ProgressTasks,
  },
  mounted() {
    this.$store.dispatch('getTasks')
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
}
</script>
