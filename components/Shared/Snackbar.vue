<template>
  <v-snackbar :value="$store.state.snackbar.show" :timeout="3000">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        @click="$store.commit('hideSnackbar')"
        color="pink"
        text
        v-bind="attrs"
      >
        {{ $t('button.form.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {}
</script>
