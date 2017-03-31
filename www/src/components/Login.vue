<template>
  <div>
        <form @submit.prevent="loginUser" id="loginModal" class="modal">
            <div class="modal-content">
                <h4 class="center">Login</h4>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" id="username" v-model="username">
                        <label for="username">Email</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="password" v-model="password">
                        <label for="password">Password</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="left">
                    <router-link to="/register" class="waves-effect waves-teal btn-flat">Register</router-link>
                </div>
                <div class="right">
                    <button type="submit" class="waves-effect waves-indigo btn indigo right-align">Login</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        mounted(){
            let vue = this;
            $('.modal').modal();
            var onModalHide = function(){
                vue.$router.push({path: '/'});
            }
            $('#loginModal').modal({
                complete : onModalHide
            });
            $('#loginModal').modal('open');
        },
        methods: {
            loginUser() {
                this.$root.$data.store.actions.login(this.username, this.password);
                this.username = '';
                this.password = '';
                $('#loginModal').modal('close');
                this.$router.push({ path: '/' })
            }
        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input{
      color: black;
  }

</style>