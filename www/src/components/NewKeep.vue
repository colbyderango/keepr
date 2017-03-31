<template>
  <div class="container">
    <h4 class="center">Create a Keep</h4>
    <form @submit.prevent="createKeep" class="row">
      <div class="input-field col s12">
        <input id="title" type="text" v-model="title" required>
        <label for="title">Title</label>
      </div>
      <div class="input-field col s6">
        <input id="image" type="text" v-model="image">
        <label for="image">Image</label>
      </div>
      <div class="input-field col s6">
        <input id="article" type="text" v-model="article">
        <label for="article">Article</label>
      </div>
      <div class="input-field col s10">

        <input id="tags" type="text" v-model="tags">
        <label for="tags">Tags</label>
      </div>
      <div class="input-field col s12">
        <select id="selected" required>
          <option v-for="vault in myVaults" :value="vault._id">{{ vault.name }}</option>
        </select>
        <label>Vault</label>
      </div>
      <div class="input-field col s12 center">
        <button type="submit" class="waves-effect waves-teal btn">Add your Keep</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'new-keep',
    data() {
      return {
        title: '',
        image: '',
        article: '',
        tags: ''
      }
    },
    computed: {
      myVaults() {
        return this.$root.$data.store.state.myVaults;
      }
    },
    mounted() {
      $('select').material_select();
    },
    methods: {
      createKeep() {

        var select = document.getElementById('selected').value;
        if (this.image == '' && this.article == '') {
          Materialize.toast('Please include an image or article', 1000);
        } else {
          let keep = {
            title: this.title,
            imageUrl: this.image,
            articleLink: this.article,
            tags: this.tags,
            userId: this.$root.$data.store.state.user._id
          }

          this.$root.$data.store.actions.createKeep(select, keep);
          this.title = '',
            this.image = '',
            this.article = '',
            this.tags = '',
            console.log('created keep')
          Materialize.toast("You've created a keep!", 1000);
        }
      }
    }
  }

</script>

<style scoped>
  input{
    color: white;
  }
  h4{
    color: white;
  }

</style>