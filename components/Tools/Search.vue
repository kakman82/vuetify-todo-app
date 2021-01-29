<template>
  <!-- sort edildiğinde search text fielde girişi engelledik - nedenini task menü sort commit kısmında detayı yazdım -->
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    :disabled="$store.state.sorting"
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
