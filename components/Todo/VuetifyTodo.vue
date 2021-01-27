<template>
  <v-container class="width:101%">
    <h3 class="success--text pl-n8 mt-n4">
      {{ $t('listName') }}:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
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

    <v-card v-if="tasks.length > 0">
      <template v-for="(task, i) in tasks">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

        <v-list-item
          @click="$store.commit('doneTask', task.id)"
          :key="`${i}-${task.id}`"
        >
          <v-list-item-action>
            <v-checkbox :input-value="task.done" color="pink"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              :class="{ 'text-decoration-line-through': task.done }"
              class="text-wrap"
            >
              {{ task.title }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <v-list-item-action v-if="task.dueDate">
                <v-list-item-action-text>
                  <v-icon x-small color="pink">mdi-calendar</v-icon>
                  {{ niceDate(task.dueDate) }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <!-- Task Menu Component   -->
            <task-menu :task="task"></task-menu>
          </v-list-item-action>

          <!-- Bu yeşil tik - ama görüntüyü bozduğundan kaldırdım
          <v-scroll-x-transition>
            <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
          </v-scroll-x-transition> -->

          <!-- Sorting Butonu   -->
          <v-list-item-action v-if="$store.state.sorting">
            <v-btn dark color="pink" icon>
              <v-icon>mdi-drag-horizontal-variant</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-card>

    <!-- Button Done Sorting  -->
    <button-done-sorting v-if="$store.state.sorting"></button-done-sorting>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { format, parseISO, parse } from 'date-fns'
import { tr } from 'date-fns/locale'
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
  methods: {
    niceDate(dateValue) {
      // bu kısım listede tarihin nasıl görüneceğine göre formatının tanımlandığı yer;
      // date-fns kullandım date format için
      // önce store ve db ye tarih nasıl kaydedildi ise yani formData dan nasıl gitti ise onu önce bir parse ile aynı formata çevirmek gerekiyor - bizim app de format 20/01/2021 şeklinde idi

      let dateParse = parse(dateValue, 'dd/MM/yyyy', new Date())

      // daha sonra locale göre istenilen format tanımlanailir;
      // ref--> https://stackoverflow.com/questions/64362242/how-to-format-date-with-date-fns

      if (this.$i18n.locale === 'tr') {
        return format(dateParse, 'MMM, d', { locale: tr })
      } else {
        return format(dateParse, 'MMM, d')
      }
    },
  },
}
</script>
