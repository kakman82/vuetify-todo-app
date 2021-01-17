<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-title class="title ma-2">
        {{ $t('toggleAppName') }}
      </v-list-item-title>
      <v-list-item-subtitle class="ma-2">
        {{ $t('toggleAppSubTitle') }}
      </v-list-item-subtitle>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.forTranslate) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed color="deep-purple" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="`${$t('toggleAppName')}`" />

      <v-spacer />

      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <v-btn rounded color="black"
          ><v-icon left>mdi-web-box</v-icon>{{ locale.name }}</v-btn
        >
      </nuxt-link>
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
  name: 'default',
  components: { Snackbar },
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-format-list-checks',
          title: 'Todo',
          to: '/',
          forTranslate: 'nav.todo',
        },
        {
          icon: 'mdi-information-variant',
          title: 'About',
          to: '/about',
          forTranslate: 'nav.about',
        },
      ],
    }
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>

<style scoped>
.v-application a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.v-icon.v-icon {
  display: inline-flex;
  border: none;
}
</style>
