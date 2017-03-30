<template>
  <div class="container">
    <div class="card">
      <div class="card-image" v-if="activeKeep.imageUrl">
        <img :src="activeKeep.imageUrl">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p class="right-align" v-if="activeKeep.userId._id == user._id && !activeKeep.public"><a @click="toggleEdit"><i class="fa fa-pencil"></i></a> </a></p>
          <h5 class="center" v-if="!activeKeep.articleLink">{{ activeKeep.title }}</h5>
          <h5 class="center" v-if="activeKeep.articleLink"><a :href="activeKeep.articleLink">{{ activeKeep.title }}</a></h5>
          <p>Created by: {{ activeKeep.userId.name }}</p>
          <p>Tags: {{ activeKeep.tags }}</p>
          <p class="right-align"><i class="fa fa-eye"></i> {{ activeKeep.views }} | <i class="fa fa-retweet"></i> {{ activeKeep.timesVaulted }}</p>
          <div v-if="showEdit">
            <form @submit.prevent="editKeep" class="row">
              <div class="input-field col s12">
                <input id="title" type="text" v-model="editTitle" required>
              </div>
              <div class="input-field col s6">
                <input id="image" type="text" v-model="editImg">
              </div>
              <div class="input-field col s6">
                <input id="article" type="text" v-model="editArticle">
              </div>
              <div class="input-field col s9">
                <input id="tags" type="text" v-model="editTags">
              </div>
              <div class="input-field col s2">
                <input type="checkbox" class="filled-in" id="filled-in-box">
                <label for="filled-in-box"><sup>Public</sup></label>
              </div>
              <div class="input-field col s12 center">
                <button @click="toggleEdit" class="waves-effect waves-teal btn btn-flat"><i class="fa fa-times"></i></button>
                <button type="submit" class="waves-effect waves-teal btn blue darken-4">Update Keep</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h4>Add to Vault</h4>
    <form @submit.prevent="addToVault" class="row">
      <div class="input-field col s12">
        <select id="selected">
          <option v-for="vault in this.$root.$data.store.state.myVaults" :value="vault._id">{{ vault.name }}</option>
        </select>
        <label>Vault</label>
      </div>
      <div class="input-field col s12 center">
        <button type="submit" class="waves-effect waves-teal btn">Add</button>
      </div>
    </form>

  </div>
</template>

<script>
  export default {
    name: 'active-keep',
    data() {
      return {
        showEdit: false,
        editTitle: '',
        editImg: '',
        editArticle: '',
        editTags: '',
        toggleEdit: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        $('select').material_select();
      })
      this.$root.$data.store.actions.setActiveKeep(this.$route.params.id);
    },
    computed: {
      myVaults() {
        return this.$root.$data.store.state.myVaults;
      },
      activeKeep() {
        return this.$root.$data.store.state.activeKeep;
      },
      user() {
        return this.$root.$data.store.state.user;
      }
    },
    methods: {
      toggleEdit() {
        this.showEdit = !this.showEdit;
        this.editTitle = this.activeKeep.title;
        this.editImg = this.activeKeep.imageUrl;
        this.editArticle = this.activeKeep.articleLink;
        this.editTags = this.activeKeep.tags;
      },
      editKeep(){

        let keep = {
          title: this.editTitle,
          imageUrl: this.editImg,
          articleLink: this.editArticle,
          tags: this.editTags

        }
        this.$root.$data.store.actions.editKeep(this.$route.params.id, keep);
        this.showEdit = false;
      },
      deleteKeep() {
        this.$root.$data.store.actions.deleteKeep(this.$route.params.id);
      },
      addToVault() {
        var select = document.getElementById('selected').value;
        let keepId = this.$route.params.id;
        let exists = false;
        this.$root.$data.store.state.myVaults.forEach(vault => {
          vault.keeps.forEach(keep => {
            if (keep == keepId) {
              exists = true;
            }
          })
        })
        if (exists) {
          Materialize.toast('You have already added this ', 1000);
        } else {
          this.$root.$data.store.actions.addToVault(keepId, select);
        }
      }
    }
  }

</script>

<style scoped>
h4{
  color: white;
}
</style>