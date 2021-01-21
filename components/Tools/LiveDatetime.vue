<template>
  <div class="mt-2 ml-4 text-subtitle-1">
    {{
      new Date().toLocaleDateString(`${$i18n.locale}`, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
    }}
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
  //! hocanın gösterdiği bu şekilde idi yani page mounted olduktan sonra aşağıdaki method çağırılıp tarihi yazacaktı navbara
  //! fakat mounted sonrasındaki dil değişikliğine göre revizeyi yapamadım sayfa reload olduktan sonra dile göre tarihler değişiyordu - ben de yukarıdaki yolu js hardcode olarak yaptım ref site --> https://stackoverflow.com/questions/57427739/vue-i18n-how-to-get-the-locale-for-the-datetimelocalization
  methods: {
    getDate() {
      if (this.$route.name === 'index___tr') {
        // console.log(this.$route.name)
        this.date = format(new Date(), 'dd, MMM', { locale: tr })
        setTimeout(this.getDate, 1000)
      } else {
        this.date = format(new Date(), 'MMM, dd')
        setTimeout(this.getDate, 1000)
      }
    },
  },
  mounted() {
    // this.getDate()
  },
}
</script>

<style></style>
