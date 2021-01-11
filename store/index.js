export const state = () => ({
  snackbar: {
    show: false,
    text: '',
  },
  tasks: [
    {
      id: 1,
      title: "Clean kitchen.Don't forget the are under the sink",
      dueDate: '2020-01-15',
      done: false,
    },
    {
      id: 2,
      title: 'Call Eric',
      dueDate: '2020-02-21',
      done: false,
    },
    {
      id: 3,
      title: 'Water flowers',
      dueDate: null,
      done: false,
    },
  ],
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
}

export const actions = {
  // burada commit {} olarak belirtmemezin sebebi ES2015 gereği daha simple hale getirmek yoksa context.commit ile erişim sağlayacaktık:  --> https://vuex.vuejs.org/guide/actions.html

  addTask({ commit }, newTodo) {
    commit('addTaskToState', newTodo)
    commit('showSnackbar', 'Task added!')
  },
  deleteTask({ commit }, id) {
    commit('deleteTaskFromState', id)
    commit('showSnackbar', 'Task deleted!')
  },
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
    commit('showSnackbar', 'Task updated!')
  },
}

export const getters = {
  // index.vue da computed içinde belirtince buna gerek kalmadı
  // getTasks(state) {
  //   //console.log(state.tasks)
  //   return state.tasks
  // },
}

//! chrome consolda Error: [vuex] Do not mutate vuex store state outside mutation handlers hatasını almamak için nuxt daki store.js deki strict tanımını false yaparak override ettim. Normal de production modunda zaten false oluyor
// https://github.com/nuxt/nuxt.js/issues/1521
// https://vuex.vuejs.org/guide/strict.html

export const strict = false
