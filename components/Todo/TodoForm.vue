<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="title"
      :rules="inputRules"
      :counter="50"
      :label="$t('form.label.todo')"
      color="pink"
      required
    ></v-text-field>

    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="dueDate"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="dueDate"
          :label="$t('form.label.date')"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          color="pink"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        light
        header-color="pink"
        scrollable
        year-icon="mdi-calendar-blank"
        prev-icon="mdi-skip-previous"
        next-icon="mdi-skip-next"
        :first-day-of-week="1"
        :locale="getLocale"
      >
        <v-spacer></v-spacer>
        <v-btn text color="green" @click="modal = false">
          {{ $t('dialog.button.cancel') }}
        </v-btn>
        <v-btn text color="pink" @click="$refs.dialog.save(date)">
          {{ $t('dialog.button.ok') }}
        </v-btn>
      </v-date-picker>
    </v-dialog>

    <v-btn small color="pink" class="mr-4 mt-1" @click="saveTodo">
      {{ $t('button.form.add') }}
    </v-btn>

    <v-btn small color="green" class="mr-4 mt-1" @click="reset">
      {{ $t('button.form.clear') }}
    </v-btn>
  </v-form>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
export default {
  emits: ['save-todo'],
  data: () => ({
    valid: true,
    modal: false,
    title: '',
    dueDate: null,
    // date: format(parseISO(new Date().toISOString()), 'dd-MM-yyyy'),
    date: null,

    inputRules: [
      (v) => !!v || 'Title is required',
      (v) => (v && v.length >= 3) || 'Must be greater than 3 characters',
      (v) => (v && v.length <= 50) || 'Must be less than 50 characters',
    ],
  }),
  computed: {
    getLocale() {
      return this.$i18n.locale
    },
  },

  methods: {
    saveTodo() {
      if (this.$refs.form.validate()) {
        //console.log(this.title, this.description)
        const formData = {
          id: Date.now(),
          title: this.title,
          dueDate: this.dueDate,
          done: false,
          translatedMessage: this.$t('snackbar.add'),
        }
        // console.log('formData: ', formData)
        this.$emit('save-todo', formData)
        // bu aşağıdaki title desr form inputlarını ayrı ayrı boşaltmak yerine direk reset funcı da çağırabiliriz
        this.reset()
        // this.title = ''
        // this.description = ''

        // buradan direkt mutationa gönderme de olurdu ama bu sefer index.vue dan form gösterim açma kapama işi zor olur, oradan commit daha işlevsel geldi
        //this.$store.dispatch('addTask', formData)
        //this.reset()
        //this.title = ''
        //this.description = ''
        // console.log('emit etmeden direk formdan mutationa gönderme çalıştı')
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
