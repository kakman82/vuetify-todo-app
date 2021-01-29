//! Danny nin kendi yaptığı npm pacage
//! browser içindeki indexedDB yi kullanmamıza olanak sağlanıyor
//! npm install localbase --save
//! https://github.com/dannyconnell/localbase
import Localbase from 'localbase'

let db = new Localbase('db')


export const state = () => ({
  sorting: false,
  search: null,
  snackbar: {
    show: false,
    text: '',
  },
  tasks: [
    // {
    //   id: 1,
    //   title: "Clean kitchen. Don't forget under the sink",
    //   dueDate: '15/01/2021',
    //   done: false,
    // },
    // {
    //   id: 2,
    //   title: 'Call Eric',
    //   dueDate: '21/02/2021',
    //   done: false,
    // },
    // {
    //   id: 3,
    //   title: 'Water flowers',
    //   dueDate: null,
    //   done: false,
    // },
  ]
})

export const mutations = {
  addTaskToState(state, newTodo) {
    state.tasks.push(newTodo)
  },
  doneTask(state, id) {
    const selectedTask = state.tasks.filter((el) => el.id === id)[0]
    selectedTask.done = !selectedTask.done
  },
  deleteTaskFromState(state, id) {
    //const indexTask = state.tasks.indexOf(task)
    //state.tasks.splice(indexTask, 1)

    // diğer bir yöntem olarak şu da yapılabilirdi splice yerine
    // metod parametre olarak id yi alırdı, htmlden nde id yi task.id yi verirdik ve filter metodunu uygulayabilirdik bu id ye eşit olmayanları filtrele gibi;
    state.tasks = state.tasks.filter((task) => task.id !== id)
  },
  updateTask(state, payload) {
    // console.log('payload: ', payload)
    const taskToUpdate = state.tasks.filter((el) => el.id === payload.id)[0]
    taskToUpdate.title = payload.title
    taskToUpdate.dueDate = payload.dueDate
  },
  setTasks(state, tasks){
    // console.log('drag sonrası tasks: ', tasks)
    // dragging sonrası yeni tasks array bizim gönderdiğimiz olmuş olacak
    state.tasks = tasks
  },
  showSnackbar(state, message) {
    // yeni todo ekleme sonrasında hemen bir todoyu silme yaptığımızda silme mesajı yeni eklenenin hemen önüne geçiyor
    // bunu engellemek için if ile mevcut ta show: true mu ya bakıyoruz, evet ise show:false yapıp sonra araya bir timeout süresi ekleyip bekletip sonra diğer mesajı gösteriyoruz
    let timeout = 0
    if (state.snackbar.show) {
      state.snackbar.show = false
      timeout = 500
    }
    setTimeout(() => {
      state.snackbar.show = true
      state.snackbar.text = message
    }, timeout)
  },
  hideSnackbar(state) {
    state.snackbar.show = false
  },
  setSearch(state, value){
    this.state.search = value
  },
  toggleSorting(state){
    state.sorting = !state.sorting
  }
}

export const actions = {
  // burada commit {} olarak belirtmemezin sebebi ES2015 gereği daha simple hale getirmek yoksa context.commit ile erişim sağlayacaktık:  --> https://vuex.vuejs.org/guide/actions.html

  getTasks({commit}) {
    db.collection('tasks').get().then(tasks => {
      commit('setTasks', tasks)
    })
  },

  addTask({ commit }, {formData, translatedMessage} ) {
    
    // console.log('actions a gelen formdata: ', formData);

    const newTask = {
      id: formData.id,
      title: formData.title,
      dueDate: formData.dueDate,
      done: formData.done
    }
    //! indexed db ye kayıt için - async olduğu için promise döner - collection içindeki isim db table name
    db.collection('tasks').add(newTask).then(() => {
      
      commit('addTaskToState', newTask)
      // bu $t çalışmadı vuex içinde localization için ... bende bu şekilde ayrıca gönderdim
      commit('showSnackbar', translatedMessage)

    })
  },
  // task done yapıldığında ya da tersinde indexeddb nin update edilmesi;
  doneTask({state, commit}, id ) {
    let selectedTask = state.tasks.filter(el => el.id === id)[0]

    db.collection('tasks').doc({id: id}).update({
      done: !selectedTask.done
    }).then(()=>{

      commit('doneTask', id)
    })
  },
  // actiona iki ayrı parametre gönderilmek istendiğinde distructing yöntemi uygulanıyor {} içinde gönderiliyor - yanı işi yukarıda addTask taki mesaj içinde yapabilirdim iki farklı örnek olması için bu şekilde bıraktım
  deleteTask({ commit }, {id, translatedMessage }) {
    db.collection('tasks').doc({id: id}).delete().then(()=> {
      commit('deleteTaskFromState', id)
      commit('showSnackbar', translatedMessage)
    })
  },
  updateTask({ commit }, {payload, translatedMessage}) {

    console.log('actions a gelen payload ve message: ', payload, translatedMessage)

    db.collection('tasks').doc({id: payload.id}).update({
      title: payload.title,
      dueDate: payload.dueDate
    }).then(() => {
      commit('updateTask', payload)
      commit('showSnackbar', translatedMessage)
    })
  },
}

export const getters = {
  filteredTask(state) {
    if(state.search === null) {
      return state.tasks
    }
    return state.tasks.filter(el => el.title.toLowerCase().includes(state.search.toLowerCase()))
  }
}

// chrome consolda Error: [vuex] Do not mutate vuex store state outside mutation handlers hatasını almamak için nuxt daki store.js deki strict tanımını false yaparak override ettim. Normal de production modunda zaten false oluyor
// https://github.com/nuxt/nuxt.js/issues/1521
// https://vuex.vuejs.org/guide/strict.html

export const strict = false
