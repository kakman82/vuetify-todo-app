<template>
  <v-container>
    <v-btn
      v-if="!showForm"
      class="mb-3"
      @click="showForm = true"
      block
      color="pink"
    >
      <v-icon left> mdi-calendar-plus </v-icon>
      {{ $t('button.form.new') }}
    </v-btn>

    <v-btn
      v-if="showForm"
      class="mb-3"
      @click="showForm = false"
      block
      color="pink"
    >
      <v-icon left> mdi-close-circle </v-icon>
      {{ $t('button.form.close') }}
    </v-btn>

    <v-form v-if="showForm" ref="form" v-model="valid" lazy-validation>
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
    <v-divider class="mt-4"></v-divider>
  </v-container>
</template>

<script>
import { format, parseISO } from 'date-fns'

export default {
  data() {
    return {
      modal: false,
      valid: true,
      showForm: false,
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
        const formData = {
          id: Date.now(),
          title: this.title,
          dueDate: this.dueDate,
          done: false,
        }

        // console.log('formData nin actionsa gönderdiği data: ', formData)

        // çeviri olduğu için bilg mesajını ayrıca oluşturup aşağıda actiona gönderdim
        const translatedMessage = this.$t('snackbar.add')

        this.$store.dispatch('addTask', { formData, translatedMessage })
        // bu aşağıdaki title desr form inputlarını ayrı ayrı boşaltmak yerine direk reset funcı da çağırabiliriz
        this.reset()
        // yeni task eklendikten sonra form görünümünün ana sayfadan kaldırılması
        this.showForm = false
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
