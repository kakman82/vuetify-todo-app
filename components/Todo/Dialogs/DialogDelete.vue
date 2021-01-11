<template>
  <v-dialog :value="true" persistent light max-width="290">
    <v-card>
      <v-card-title class="text-center headline red--text">
        Are you sure?
      </v-card-title>
      <v-card-text
        >Do you really want to delete this todo? This process cannot be
        undone.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')"> No </v-btn>
        <v-btn
          @click="$store.dispatch('deleteTask', task.id)"
          color="pink"
          text
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
}
</script>

<style>
.v-dialog > .v-card > .v-card__title {
  display: block;
}
</style>
