// vue-router daki globally navigation guard yani router.beforeEach(to, from, next) vue da router.js içinde tanımlanırken nuxt da bu işlemler middleware altında yapılıyor. Bu middleware her page de geçerli olmasını istersek global olarak nuxt.config de router altında tanımlayabiliriz ki bu uygulamada bu şekilde yaptım nuxt.config.js de görebilirsin. Ayrı ayrı page lerde uygulamak için ise her page middleware: 'dosyaadı - bu örnekte pageTitle' tanımlanarak yapılabilir. Şu videodaki anlatım başarılı -- > https://www.youtube.com/watch?v=mW1Xf5PBF0w

// nuxt da her bir değişken context parametresinin altında yer alıyor - store da aynı şekilde
// fakat ayrı ayrı da kullanılabilir bu şekilde, route, store, axios vs..

//! Locale bilgisine erişim
//? context.app.i18n.locale where you have access to NuxtContext (ki bu middleware de app.i18n.locale çalıştı :))
//? this.$i18n.locale in component
//? $i18n.locale in template

export default function ({app, route}) {
    // document.title = `$t('listName') - ${store.router.name}`
    // console.log('pageTitle middleware is globally working...!')
    // console.log('route name: ', route.name);
    console.log('sayfa dili: ', app.i18n.locale);
    console.log('route path: ', route.path);
    let getRouteFullName = route.path.split('/')
    let lastElement = getRouteFullName.length - 1
    console.log(lastElement);
    let routeName = getRouteFullName[lastElement]
    // The regex pattern is /^./ matches the first character of a string.
    let finalRouteName = routeName.replace(/^./, routeName[0].toUpperCase());
    console.log('final name: ', finalRouteName)

    //! nuxt da window ya da document objesine erişmek biraz problemli imiş bu nedenle bu title işini nuxt sitesinde belirtildiği gibi head() metodu ile page altındaki dosyalar üzerinden yapmaya çalıştım -- > https://nuxtjs.org/faq/window-document-undefined ve --> https://stackoverflow.com/questions/60134881/nuxt-js-window-or-document-is-not-defined
    // window.document.title = `Vuetify Todo | ${finalRouteName}`
    
}