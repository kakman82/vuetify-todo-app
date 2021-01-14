<template>
  <v-dialog :value="true" persistent light max-width="290">
    <v-card>
      <v-card-title class="headline text-center"> Edit Task </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col cols="12">
          <v-text-field
            v-model="taskTitle"
            :rules="inputRules"
            :counter="50"
            label="Title"
            color="pink"
            hint="Edit the title of this task"
          ></v-text-field>

          <v-dialog 
              v-model="modal" 
              light 
              ref="dialog" 
              persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="date"
                label="Select due date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                color="pink"
                hint="Edit the due date of this task"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              header-color="pink"
              scrollable
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
              :first-day-of-week="1"
              locale="tr-TR"
            >
              <v-spacer></v-spacer>
              <v-btn text color="green" @click="modal = false"> Cancel </v-btn>
              <v-btn text color="pink" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close')">
            Cancel
          </v-btn>
          <v-btn
            @click="sendDataForUpdate"
            :disabled="!valid"
            color="pink"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO } from 'date-fns'
import { tr } from 'date-fns/locale'
export default {
  props: ['task', 'dialogs'],
  data() {
    return {
      valid: true,
      modal: false,
      taskTitle: null,
      editableDate: null,
      date: null,
      // date: new Date().toISOString().substr(0, 10),

      inputRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length >= 3) || 'Must be greater than 3 characters',
        (v) => (v && v.length <= 50) || 'Must be less than 50 characters',
      ],
    }
  },
  //! sayfa render edildikten sonra kayıtlı task verilerini almak için mounted kullandık
  mounted() {
    this.taskTitle = this.task.title
    this.date = this.task.dueDate

  },
  
  // burada tarihin date pickerdaki değişikliğini izledim, son değeri editableDate atayıp bunu aşağıdaki payload ile gönderdim böylece date pickerı tam olarak hakkıyla kullanılmış oldu
  watch: {
    date(val, oldval) {
      console.log('son değer: ', val)
      console.log('ilk değer: ', oldval)
      this.editableDate = val

    }
  },

  methods: {
    sendDataForUpdate() {
      if (this.$refs.form.validate()) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
          dueDate: this.editableDate
        }
        console.log('updateData: ', payload)
        this.$store.dispatch('updateTask', payload)
        this.dialogs.edit = false
      }
    },
  },
}
</script>

<style></style>
