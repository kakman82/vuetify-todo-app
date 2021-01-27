<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark color="pink" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-subheader>Menu</v-subheader>
        <v-list-item-group v-model="selectedItem" color="pink">
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-icon>
              <v-icon v-text="item.icon" small color="pink"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="clickHandler(index)">
                {{ $t(item.title) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <dialog-edit
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
      :dialogs="dialogs"
    ></dialog-edit>

    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    ></dialog-delete>
  </div>
</template>

<script>
import DialogDelete from './Dialogs/DialogDelete.vue'
import DialogEdit from './Dialogs/DialogEdit.vue'
export default {
  components: { DialogDelete, DialogEdit },
  props: ['task'],
  data: () => ({
    selectedItem: '',
    dialogs: {
      edit: false,
      delete: false,
    },
    items: [
      {
        title: 'taskMenu.edit',
        icon: 'mdi-pencil-plus',
        click() {
          // console.log('edit')
          this.dialogs.edit = true
        },
      },

      {
        title: 'taskMenu.delete',
        icon: 'mdi-delete',
        click() {
          // console.log('delete')
          // this ile data içindeki tanımlı verilere ulaşmak istediğimizde consolda undefined hatası veriyor. çünkü aşağıdaki this click metodunu gösteriyor, bunu çözmek için bu metodu kullanan aşağıdaki clickHandker içinde click.call(this) diyerek vue instance ulaşmış olduk..
          this.dialogs.delete = true
        },
      },
      {
        title: 'taskMenu.sort',
        icon: 'mdi-drag-horizontal-variant',
        click() {
          this.$store.commit('toggleSorting')
        },
      },
    ],
  }),
  methods: {
    clickHandler(index) {
      // this.items[index].click()
      // önceden böyleydi fakat delete için yukarıdaki yapı ile yapı this ile dialogs a erişebilmek için call(this) yapısını kullandık
      this.items[index].click.call(this)
    },
  },
}
</script>

<style></style>
