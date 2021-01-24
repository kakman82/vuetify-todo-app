<template>
  <v-container>
    <p class="font-weight-black">{{ $t('aboutPage') }}</p>
    <div class="d-flex-justify">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
        sint tempora minima tenetur, nulla illum alias, eveniet, nostrum
        quisquam nisi voluptas non corporis placeat iusto aliquid culpa qui
        iure? Unde!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
        sint tempora minima tenetur, nulla illum alias, eveniet, nostrum
        quisquam nisi voluptas non corporis placeat iusto aliquid culpa qui
        iure? Unde!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
        sint tempora minima tenetur, nulla illum alias, eveniet, nostrum
        quisquam nisi voluptas non corporis placeat iusto aliquid culpa qui
        iure? Unde!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
        sint tempora minima tenetur, nulla illum alias, eveniet, nostrum
        quisquam nisi voluptas non corporis placeat iusto aliquid culpa qui
        iure? Unde!
      </p>
    </div>
  </v-container>
</template>

<script>
// https://i18n.nuxtjs.org/routing uyguladım - hem component de hem de nuxt.config de modül tanımından da oluyor
// export default {
//   nuxtI18n: {
//     paths: {
//       en: '/about-us',
//       tr: '/hakkimizda',
//     },
//   },
// }
export default {
  data() {
    return {
      // pageTitle: 'Test Title ',
    }
  },
  computed: {
    pageTitle() {
      // dile göre title adı vermek için computed kullandım
      return this.$i18n.locale === 'tr'
        ? 'Yap. Uyg. | Hakkımızda'
        : 'Todo App | About us'
    },
  },
  head() {
    return {
      // titleTemplate: `%s | ${this.pageTitle}`,
      // title direkt olarak tam adı verilen değer yapıyor - titleTemplate ile bu formatta yapmak mümkün : Kerem Todo | Hakkımızda gibi ama burada Kerem Todo titleTemplate olarak global tanımladığı için hem tr hem de eng de anısı gelir fakat computed daki gibi tanım olursa dile göre istediğimiz title gelir
      title: this.pageTitle,
    }
  },
}
</script>
