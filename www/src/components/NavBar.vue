<template>
    <div>
        <div class="navbar-fixed">
            <nav class="N/A transparent">
                <div class="nav-wrapper ">
                    <a href="#" class="brand-logo right"><img class="logo" src="../assets/logo.jpg"></a>
                    <ul v-if="!this.$root.$data.store.state.user._id" class="right">
                        <li>
                            <router-link to="login">Login</router-link>
                        </li>
                        <li>
                            <router-link to="register">Sign Up</router-link>
                        </li>
                        <li>
                            <router-link to="/allkeeps">All Keeps</router-link>
                        </li>
                    </ul>
                    <ul v-if="this.$root.$data.store.state.user._id" class="left">
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/allkeeps">All Keeps</router-link>
                        </li>
                        <li>
                            <div class="divider"></div>
                        </li>
                        <li><a class="waves-effect" @click="logout">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        methods: {
            logout() {
                this.$root.$data.store.actions.logout();
                this.$router.push({ path: '/' });
            }
        },
        mounted() {
            this.$root.$data.store.actions.authenticate();
            $(".button-collapse").sideNav();
        }
    }

</script>

<style scoped>
    .brand-logo {
        margin-left: 10px;
    }
    
    li {
        color: white;
    }
    
    li a {
        color: white;
    }
    
    li a i {
        color: white;
    }
    
    .menu-padding {
        margin-right: 30px;
    }
    
    .logo {
        max-width: 50px;
        margin-top: 7px;
    }
    
    ul.side-nav {
        background-color: salmon;
    }
    
    .name,
    .email {
        font-weight: bold;
        text-shadow: black 0.1em 0.1em 0.1em, 0px 0px 5px black;
    }
</style>