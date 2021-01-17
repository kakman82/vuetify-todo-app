<template>
  <v-dialog :value="true" persistent light max-width="290">
    <v-card>
      <v-card-title class="text-center headline red--text">
        {{ $t('dialog.delete.title') }}
      </v-card-title>
      <v-card-text>{{ $t('dialog.delete.desc') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">
          {{ $t('dialog.button.no') }}
        </v-btn>
        <v-btn @click="sendTaskToDelete(task.id)" color="pink" text>
          {{ $t('dialog.button.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    sendTaskToDelete(id) {
      const translatedMessage = this.$t('snackbar.delete')
      this.$store.dispatch('deleteTask', { id, translatedMessage })
    },
  },
}
</script>

<style>
.v-dialog > .v-card > .v-card__title {
  display: block;
}
</style>
