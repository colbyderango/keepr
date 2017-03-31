<template>
    <div class="container  masonry">
        <h4 class="center">All Keeps</h4>
        <div class="row center">
            <div v-for="keep in keeps" class="item">
                <keep :keep="keep"></keep>
            </div>
        </div>
    </div>
</template>

<script>
    import Keep from './Keep'

    export default {
        name: 'allkeeps',
        components: {
            Keep
        },
        data() {
            return {
                hoverShow: false
            }
        },
        computed: {
            keeps() {
                return this.$root.$data.store.state.keeps;
            }
        },
        mounted() {
            this.$root.$data.store.actions.getPublicKeeps();
        },
        methods: {
            showAction() {
                this.hoverShow = !this.hoverShow;
            }
        }
    }

</script scoped>

<style>
    body {
        background-image: url("http://www.planwallpaper.com/static/images/6790904-free-background-wallpaper.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-position: 100% auto;
        position: relative;
    }
    
    .masonry {
        /* Masonry container */

        align-items: center;
        column-count: 3;
        column-gap: 1em;
        height: 100%;
    }
    
    .item {

        display: inline-block;
        margin: 1em 1em 1em;
        width: 100%;
    }
    h4{
        color: white;
    }
</style>