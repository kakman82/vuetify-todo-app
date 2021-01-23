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
    <v-card class="overflow-hidden">
      <v-app-bar
        :clipped-left="clipped"
        app
        absolute
        color="indigo darken-4"
        shrink-on-scroll
        scroll-target="#scrolling-techniques"
        prominent
        height="120"
        scroll-threshold="900"
      >
        <!-- https://vuetifyjs.com/en/styles/text-and-typography/#wrapping-and-overflow -->

        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <v-app-bar-title>
          <v-row no-gutters>
            <div class="text-h5 text-truncate">
              {{ $t('toggleAppName') }}
            </div>
          </v-row>

          <v-row no-gutters>
            <live-datetime class="text-subtitle-1"></live-datetime>
          </v-row>
        </v-app-bar-title>

        <v-spacer />

        <nuxt-link
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          <v-btn rounded color="black" small class="mt-2"
            ><v-icon left small>mdi-web-box</v-icon>{{ locale.name }}</v-btn
          >
        </nuxt-link>
      </v-app-bar>

      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-main>
          <v-container style="height: 1000px">
            <nuxt />
            <snackbar></snackbar>
          </v-container>
        </v-main>
      </v-sheet>
    </v-card>
    <!-- 
    <v-main>
            <v-container>
              <nuxt />
              <snackbar></snackbar>
            </v-container>
          </v-main> -->

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
      clipped: true,
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
.v-icon.v-icon {
  display: inline-flex;
  border: none;
}
</style>
