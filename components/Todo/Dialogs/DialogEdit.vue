<template>
  <v-dialog :value="true" persistent light max-width="290">
    <v-card>
      <v-card-title class="headline text-center">
        {{ $t('form.edit.titleName') }}
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col cols="12">
          <v-text-field
            v-model="taskTitle"
            :rules="inputRules"
            :counter="50"
            label="Title"
            color="pink"
            :hint="$t('form.edit.textFieldHint')"
          ></v-text-field>

          <v-dialog ref="dialog" light v-model="modal" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="currentDueDate"
                :label="$t('form.label.date')"
                prepend-icon="mdi-calendar"
                clearable
                v-bind="attrs"
                v-on="on"
                color="pink"
                @click:clear="date = null"
                :hint="$t('form.edit.dateFieldHint')"
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
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close')">
            {{ $t('dialog.button.cancel') }}
          </v-btn>
          <v-btn
            @click="sendDataForUpdate"
            :disabled="!valid"
            color="pink"
            text
          >
            {{ $t('button.form.save') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO, parse } from 'date-fns'
import { tr } from 'date-fns/locale'
export default {
  props: ['task', 'dialogs'],
  data() {
    return {
      valid: true,
      modal: false,
      taskTitle: null,
      currentDueDate: null,
      date: null,
      newDueDate: null,
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
  },

  //! sayfa render edildikten sonra kayıtlı task verilerini almak için mounted kullandık - created da kullanılıyor farkı created daha çok server side ile veri alındığında tercih edilmesi imiş
  // mounted esasen en son da yer alıyor sayfada herşey oturduktan sonraki adım, created daha sonrası
  mounted() {
    this.taskTitle = this.task.title

    if (this.task.dueDate) {
      //this.currentDueDate = this.task.dueDate
      this.currentDueDate = this.task.dueDate
    }
  },

  // burada tarihin date pickerdaki değişikliğini izledim, son değeri editableDate atayıp bunu aşağıdaki payload ile gönderdim böylece date pickerı tam olarak hakkıyla kullanılmış oldu
  watch: {
    date(newValue, oldValue) {
      // console.log('ilk değer: ', oldValue)
      // console.log('son değer: ', newValue)

      // değişiklik yapılan son değerin forma tını uygun hale getirip currentDueDate eşitledim ki aşağıdaki metod formdata eşliğinde gidebilsin böylece uygulamadaki formatlar eşitlenmiş oldu
      // console.log('format öncesi newDate: ', this.newDueDate)
      this.newDueDate = format(parseISO(newValue), 'dd/MM/yyyy')

      // console.log('en son girilen tarihin formatlı hali: ', this.newDueDate)
      // tarihin editlendikten sonra son seçimin text alanında görünmesi için eşitledim;
      this.currentDueDate = this.newDueDate
    },
  },

  methods: {
    sendDataForUpdate() {
      if (this.$refs.form.validate()) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
          dueDate: this.newDueDate,
          translatedMessage: this.$t('snackbar.update'),
        }
        //console.log('updateData: ', payload)
        this.$store.dispatch('updateTask', payload)
        this.dialogs.edit = false
      } else {
        console.log('Form is not valid!')
      }
    },
  },
}
</script>

<style></style>
