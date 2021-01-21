<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    outlined
    :label="$t('searchTExtField')"
    prepend-inner-icon="mdi-clipboard-text-search-outline"
    color="pink"
    clearable
    clear-icon="mdi-close-circle-outline"
  ></v-text-field>
</template>

<script></script>

<style></style>
