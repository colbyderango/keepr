<template>
    <div>
        <form @submit.prevent="registerUser" id="registerModal" class="modal">
            <div class="modal-content">
                <h4 class="center">Register</h4>
                <div class="row">
                    <div class="input-field col s6">
                        <input type="text" id="name" v-model="name" required>
                        <label for="name">Name</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="text" id="email" v-model="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="password" v-model="password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field col s6">
                        <input type="password" id="confirmPass" v-model="confirmPass" required>
                        <label for="confirmPass">Confirm Password</label>
                    </div>
                  
                </div>
            </div>
            <div class="modal-footer">
                <div class="left">
                    <router-link to="/login" class="waves-effect waves-teal btn-flat">Login</router-link>
                </div>
                <div class="right">
                    <button type="submit" class="waves-effect waves-indigo btn indigo right-align">Register</button>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                name: '',
                password: '',
                confirmPass: '',
                email: ''
            }
        },
        mounted() {
            let vue = this;
            $('.modal').modal();
            var onModalHide = function () {
                vue.$router.push({ path: '/' });
            }
            $('#registerModal').modal({
                complete: onModalHide
            });
            $('#registerModal').modal('open');
        },
        methods: {
            registerUser: function () {
                if (this.password == this.confirmPass) {
                    this.$root.$data.store.actions.register(this.name, this.email, this.password);
                    this.email = '';
                    this.password = '';
                    this.name = '';
                    this.confirmPass = '';
                    $('#registerModal').modal('close');
                    this.$router.push({ path: '/' });
                } else {
                    this.password = '';
                    this.confirmPass = '';
                    Materialize.toast('Incorrect Login', 1000);
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .register {
        padding-top: 5rem;
    }
    input{
        color: black;
    }
</style>