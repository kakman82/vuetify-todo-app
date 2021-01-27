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
                {{ niceDate(task.dueDate) }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <task-menu :task="task"></task-menu>
        </v-list-item-action>

        <v-list-item-action v-if="$store.state.sorting">
          <v-btn dark color="pink" icon>
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import TaskMenu from './TaskMenu'
import { format, parseISO, parse } from 'date-fns'
import { tr } from 'date-fns/locale'

export default {
  components: { TaskMenu },
  props: ['task'],
  // burada niceDate için filters kullandı fakat bu yöntem vue3 de kaldırılmış yerine computed kullanılamasını öneriyor vue sitesinde --> https://v3.vuejs.org/guide/migration/filters.html#_2-x-syntax computed yerine localization için methods kullandım çünkü tarihi parametre olarak göndermem gerekiyordu
  methods: {
    niceDate(dateValue) {
      // bu kısım listede tarihin nasıl görüneceğine göre formatının tanımlandığı yer;
      // date-fns kullandım date format için
      // önce store ve db ye tarih nasıl kaydedildi ise yani formData dan nasıl gitti ise onu önce bir parse ile aynı formata çevirmek gerekiyor - bizim app de format 20/01/2021 şeklinde idi

      let dateParse = parse(dateValue, 'dd/MM/yyyy', new Date())

      // daha sonra locale göre istenilen format tanımlanailir;
      // ref--> https://stackoverflow.com/questions/64362242/how-to-format-date-with-date-fns

      if (this.$i18n.locale === 'tr') {
        return format(dateParse, 'd MMM Y, EEE', { locale: tr })
      } else {
        return format(dateParse, 'EEE, MMM do, Y')
      }
    },
  },
}
</script>

<style scoped>
.v-list-item .v-list-item__title {
  white-space: normal;
}
</style>
