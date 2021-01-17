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
// https://i18n.nuxtjs.org/routing uyguladım fakat çalışmadı...
export default {
  nuxtI18n: {
    paths: {
      en: '/about-us',
      tr: '/hakkimizda',
    },
  },
}
</script>
