<template>
    <div class="container">
        <div class="pages">
            <ul class="pagination">
                <li :class="{ active: showVaults, 'waves-effect': showKeeps }"><a @click="activateVaults">Vaults</a></li>
                <li :class="{ active: showKeeps, 'waves-effect': showVaults }"><a @click="activateKeeps">Keeps</a></li>
            </ul>
        </div>

        <div v-show="showVaults">
            <h4 class="center">My Vaults
            </h4>
            <router-link to="/vaults" class="waves-effect waves-teal btn flat">Add Vault</router-link>
            <div v-for="vault in myVaults" class="card">
                <div class="card-image" v-if="vault.imageUrl">
                    <img :src="vault.imageUrl">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h5>
                            <router-link :to="'/vaults/' + vault._id">{{ vault.name }}</router-link>
                        </h5>
                        <p>{{ vault.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="showKeeps" class="masonry">
            <h4 class="center">My Keeps
            </h4>
            <router-link to="/keeps" class="waves-effect waves-teal btn">Add Keep</router-link>
            <div class="row center">
                <div v-for="keep in myKeeps" class="item">
                    <keep :keep="keep"></keep>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Keep from './Keep'

    export default {
        name: 'dashboard',
        components: {
            Keep
        },
        data() {
            return {
                hoverShow: false,
                showKeeps: false,
                showVaults: true
            }
        },
        computed: {
            user() {
                return this.$root.$data.store.state.user;
            },
            myVaults() {
                return this.$root.$data.store.state.myVaults;
            },
            myKeeps() {
                return this.$root.$data.store.state.myKeeps;
            }
        },
        mounted() {
            $(".button-collapse").sideNav();
            this.$root.$data.store.actions.getUserVaults();
            this.$root.$data.store.actions.getUserKeeps();
        },
        methods: {
            showAction() {
                this.hoverShow = !this.hoverShow;
            },
            activateKeeps() {
                this.showVaults = false;
                this.showKeeps = true;
            },
            activateVaults() {
                this.showVaults = true;
                this.showKeeps = false;
            },
            deleteVault(vault) {
                this.$root.$data.store.actions.deleteVault(vault._id);
            }
        }
    }

</script>

<style scoped>
    .input{
        color: white;

    }
    h5{
        color: black;
    }
    h4{
        color: White;
    }
    .masonry {
        /* Masonry container */
        align-items: center;
        column-count: 3;
        column-gap: 1em;
        height: 100%;
    }
    
    .item {
        /* Masonry bricks or child elements */
        /*padding: px;*/
        display: inline-block;
        margin: 1em 1em 1em;
        width: 100%;
    }
    
    .height {
        height: 30px;
    }
    
    .secondary-content a {
        color: black;
    }
    
    .collection-item {
        color: white;
        text-shadow: black 0.1em 0.1em 0.1em, 0px 0px 5px black;
    }
    
    .collection-item a {
        color: white;
    }
    
    .collection-item a:hover {
        color: white;
    }
    .pagination li a {
        color: white;
    }
    .pagination li.active {
        background: teal;
    }
    
    .pagination li.active a {
        color: white;
    }
    
    .btn-floating i {
        color: white;
    }
    
    .pages {
        display: flex;
        justify-content: center;
        bottom: 0;
    }
</style>