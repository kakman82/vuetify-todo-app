<template>
  <v-container>
    <h3 class="success--text pl-n8 mt-n4">
      {{ $t('listName') }}: {{ tasks.length }}
    </h3>
    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 blue--text text--darken-2">
        {{ $t('remaining') }}: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 pink--text text--darken-2">
        {{ $t('completed') }}: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        class="mr-2"
        color="pink"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      tasks: 'filteredTask',
    }),
    completedTasks() {
      return this.tasks.filter((task) => task.done).length
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks
    },
  },
}
</script>

<style></style>
