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

    <v-dialog ref="dialog" v-model="modal" persistent width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="dueDate"
          :label="$t('form.label.date')"
          prepend-icon="mdi-calendar"
          clearable
          v-bind="attrs"
          v-on="on"
          color="pink"
          @click:clear="date = null"
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
        show-adjacent-months
        :first-day-of-week="1"
        :locale="getLocale"
        @change="menu = false"
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

  data() {
    return {
      modal: false,
      valid: true,
      title: '',
      date: null,
      inputRules: [
        (v) => !!v || this.$t('form.errorRequired'),
        (v) => (v && v.length >= 3) || this.$t('form.errorGreaterThan'),
        (v) => (v && v.length <= 50) || this.$t('form.errorLessThan'),
      ],
    }
  },
  computed: {
    getLocale() {
      return this.$i18n.locale
    },
    // bu şekilde tarih seçimi sonrası text field da görünecek olan tarihin formatını değiştirmiş oldum - bu önemli ne yaparsak aşağıda formData ile store ya da db ye aynı şekilde gönderilecek ve yine aynı formatta tarihi alıp parse edip sonra istenilen görüntüdeki formata dönüşütürülmeli
    dueDate() {
      return this.date ? format(parseISO(this.date), 'dd/MM/yyyy') : ''
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
