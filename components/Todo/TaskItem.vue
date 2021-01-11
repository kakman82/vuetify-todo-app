<template>
  <div>
    <v-list-item
      @click="$store.commit('doneTask', task.id)"
      :class="{ 'pink lighten-3': task.done }"
    >
      <!-- <template v-slot:default> -->
      <template>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="pink"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
          >
            {{ task.title }}
          </v-list-item-title>

          <v-list-item-subtitle>
            <v-list-item-action v-if="task.dueDate">
              <v-list-item-action-text>
                <v-icon small color="pink">mdi-calendar</v-icon>
                {{ task.dueDate | niceDate }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <task-menu :task="task"></task-menu>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import TaskMenu from './TaskMenu'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default {
  components: { TaskMenu },
  props: ['task'],
  // burada filters yerine computed da kullanabilirdik, hoca bu şekilde yaptı örnek olması için ben de ekledim bu sitede de anlatım mevcut --> https://medium.com/@mert.demir96/vuejs-filter-%C3%B6zelli%C4%9Fi-nas%C4%B1l-kullan%C4%B1l%C4%B1r-3c2ce2016d9b
  filters: {
    niceDate(value) {
      return format(new Date(value), 'd MMM Y, EEE', { locale: tr })
    },
  },
}
</script>

<style scoped>
.v-list-item .v-list-item__title {
  white-space: normal;
}
</style>
