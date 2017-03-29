<template>
  <div class="container">
    <h4 class="center">Create a Vault</h4>
    <form @submit.prevent="createVault">
      <div class="input-field col s12">
        <input id="name" type="text" v-model="name" required>
        <label for="name">Name</label>
      </div>
      <div class="input-field col s12">
        <input id="image" type="text" v-model="image">
        <label for="image">Cover Image URL</label>
      </div>
      <div class="input-field col s12">
        <input id="description" type="text" v-model="description">
        <label for="description">Description</label>
      </div>
      <button type="submit" class="waves-effect waves-teal btn">Create</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'new-vault',
    data() {
      return {
        name: '',
        description: '',
        image: ''
      }
    },
    methods: {
      createVault() {
        this.$root.$data.store.actions.createVault(this.name, this.description, this.image);
      }
    }
  }

</script>

<style>

</style>