<template>
  <div class="container">
    <div class="card ">
      <div class="card-image" v-if="activeVault.imageUrl">
        <img :src="activeVault.imageUrl">
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <h4>{{ activeVault.name }}</h4>
          <p>{{ activeVault.description }}</p>
          <p class="right-align"><button class="btn btn-flat waves-effect waves-teal" @click="toggleEdit"><i v-if="!showEdit" class="fa fa-pencil"></i><i v-if="showEdit" class="fa fa-times"></i></button></p>
          <div v-if="showEdit">
            <form @submit.prevent="editVault">
              <div class="input-field">
                <input id="name" type="text" v-model="editName"  placeholder="Title">
              </div>
              <div class="input-field">
                <input id="image" type="text" v-model="editImg"  placeholder="ImageUrl">
              </div>
              <div class="input-field">
                <input id="description" type="text" v-model="editDesc" placeholder="Description">
              </div>
              <div class="input-field">
                <button type="submit" class="waves-effect waves-teal blue darken-4 btn">Edit Your Vault</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
       <!--<div v-show="showKeeps" class="masonry">
            <h4 class="center">My Keeps
            </h4>
            <router-link to="/keeps" class="waves-effect waves-teal btn">Add Keep</router-link>
            <div class="row center">
                <div v-for="keep in myKeeps" class="item">
                    <keep :keep="keep"></keep>
                </div>
            </div>
        </div>-->
    <div v-if="activeVault.keeps" class="masonry">
      <div v-for="keep in activeVault.keeps" class="item">
        <div class="right-align">
          <a @click="removeFromVault(keep)"><i class="fa fa-times"></i></a>
        </div>
        <keep :keep="keep"></keep>
      </div>
    </div>
    <div v-if="!activeVault.keeps">
      <router-link to="/allkeeps">Check out some Keeps</router-link>
    </div>
  </div>
</template>

<script>
  import Keep from './Keep'

  export default {
    name: 'Vault',
    components: {
      Keep
    },
    data() {
      return {
        showEdit: false,
        editName: '',
        editDesc: '',
        editImg: ''
      }
    },
    computed: {
      activeVault() {
        return this.$root.$data.store.state.activeVault;
      }
    },
    mounted() {
      this.$root.$data.store.actions.setActiveVault(this.$route.params.id);
    },
    
    methods: {
      removeFromVault(keep) {
        this.$root.$data.store.actions.removeFromVault(this.$route.params.id, keep._id);
      },
      toggleEdit() {
        this.showEdit = !this.showEdit;
        this.editName = this.activeVault.name;
        this.editDesc = this.activeVault.description;
        this.editImg = this.activeVault.imageUrl;
      },
      editVault(){
        this.$root.$data.store.actions.editVault(this.$route.params.id, this.editName, this.editDesc, this.editImg);
        this.showEdit = false;
      }
      
    }
  }

</script>
<style scoped>
input{
  color: black;
}
h4{
  color: black;
}
p{
  color: black;
}
</style>