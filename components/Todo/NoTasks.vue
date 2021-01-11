<template>
  <div class="no-tasks">
    <div class="icon">
      <v-icon size="100" color="pink"> mdi-check </v-icon>
    </div>
    <v-spacer></v-spacer>
    <div class="text-h4 pink--text">No tasks!</div>
  </div>
</template>

<style lang="sass" scoped>
.no-tasks
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  opacity: 0.5

.v-icon.v-icon
    text-indent: 30px
</style>
