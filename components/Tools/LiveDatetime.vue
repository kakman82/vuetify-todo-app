<template>
  <!-- <div class="mt-2 ml-4 text-subtitle-1"> -->
  <div>
    {{ date }}
  </div>
</template>

<script>
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default {
  data() {
    return {
      date: '',
    }
  },
  // değişen locale bilgisi buradan geliyor
  computed: {
    lang() {
      return this.$i18n.locale
    },
  },
  //! hocanın gösterdiği bu şekilde idi yani page mounted olduktan sonra aşağıdaki method çağırılıp tarihi yazacaktı navbara
  //! fakat mounted sonrasındaki dil değişikliğine göre revizeyi yapamadım sayfa reload olduktan sonra dile göre tarihler değişiyordu - ben de yukarıdaki yolu js hardcode olarak yaptım ref site --> https://stackoverflow.com/questions/57427739/vue-i18n-how-to-get-the-locale-for-the-datetimelocalization
  methods: {
    getDate() {
      // lang bilgisi computed dan geliyor
      if (this.lang === 'tr') {
        // console.log(this.$route.name)
        this.date = format(new Date(), 'dd MMMM, H:mm:ss', { locale: tr })
        setTimeout(this.getDate, 1000)
      } else {
        this.date = format(new Date(), 'MMMM dd, H:mm:ss')
        setTimeout(this.getDate, 1000)
      }
    },
    //! bunu örnek olması amacıyla ekledim - htmlin içine direk olarak {{}} içinde eklendiğinde locale göre tarih ve saati gösteriyor - fakat locale değiştiğinde güncelleme yapmadığı için kullanmadım tek bir dil için kullanılabilir
    // new Date().toLocaleDateString(`${$i18n.locale}`, {
    //     weekday: 'short',
    //     month: 'short',
    //     day: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false,
    //   })
  },
  // sayfa yüklendikten sonra metdosun çağırılması için mounted()
  mounted() {
    this.getDate()
  },
  // bu şekilde watch ile dil değişikliği izlenebilir, kullanılabilir ama benim işimi computed gördü :)
  // watch: {
  //   lang(newLang, oldLang) {
  //     console.log('oldLang: ', oldLang)
  //     console.log('newLang: ', newLang)
  //   },
  // },
}
</script>

<style></style>
