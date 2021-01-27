<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="768"
      app
      class="indigo darken-2"
    >
      <v-img
        class="pa-4 pt-7"
        src="../todo-lists-5238324_1920.jpg"
        height="170"
      >
      </v-img>

      <v-list-item class="px-2">
        <v-list-item-title>Menu</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-list-item-title class="title ma-2">
        {{ $t('toggleAppName') }}
      </v-list-item-title>
      <v-list-item-subtitle class="ma-2">
        {{ $t('toggleAppSubTitle') }}
      </v-list-item-subtitle>
      <v-divider></v-divider> -->

      <v-list dense nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t(item.forTranslate) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-4" dark prominent>
      <!-- https://vuetifyjs.com/en/styles/text-and-typography/#wrapping-and-overflow -->

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-spacer></v-spacer>
          <v-btn small rounded color="black" class="mt-4" link>
            <nuxt-link
              v-for="locale in availableLocales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
            >
              <v-icon small left>mdi-web-box</v-icon>{{ locale.name }}
            </nuxt-link>
          </v-btn>
        </v-row>
        <v-row>
          <v-toolbar-title class="d-inline-flex text-h5 mt-5 ml-16">
            {{ $t('toggleAppName') }}
          </v-toolbar-title>
        </v-row>
        <live-datetime
          class="d-inline-flex text-subtitle-1 ml-14"
        ></live-datetime>
        <v-row> </v-row>
      </v-container>

      <v-spacer />

      <!-- <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <v-btn rounded color="black" small class="mt-2"
          ><v-icon left small>mdi-web-box</v-icon>{{ locale.name }}</v-btn
        >
      </nuxt-link> -->
    </v-app-bar>

    <v-main>
      <nuxt />
      <snackbar></snackbar>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} krm</span>
    </v-footer>
  </v-app>
</template>

<script>
import Snackbar from '../components/Shared/Snackbar.vue'
import LiveDatetime from '../components/Tools/LiveDatetime.vue'
export default {
  name: 'default',
  components: { Snackbar, LiveDatetime },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-format-list-checks',
          title: 'Todo',
          // slash / olmadan gönderildiğinde oldu
          to: 'index',
          forTranslate: 'nav.todo',
        },
        {
          icon: 'mdi-information-variant',
          title: 'About',
          // slash / olmadan gönderildiğinde oldu direkt moduldeki tanımdan en ise /about-us tr ise tr/hakkimizda ya gidiyor link..
          to: 'about',
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

.header-container {
  max-width: none !important;
}
</style>
