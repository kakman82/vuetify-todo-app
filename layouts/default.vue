<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-title class="title ma-2"> ToDo App </v-list-item-title>
      <v-list-item-subtitle class="ma-2"> Best Todo Ever! </v-list-item-subtitle>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed color="deep-purple" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <snackbar></snackbar>
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} krm</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '../components/Shared/Snackbar.vue'
export default {
  components: { Snackbar },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-format-list-checks',
          title: 'ToDo',
          to: '/',
        },
        {
          icon: 'mdi-information-variant',
          title: 'About',
          to: '/about',
        },
      ],

      title: 'Vuetify ToDo App',
    }
  },
}
</script>
