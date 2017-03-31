<template>
  <div class="hello">
    <router-view></router-view>
    <dashboard v-if="this.$root.$data.store.state.user._id"></dashboard>
  </div>
</template>

<script>

  import Dashboard from './Dashboard'

  export default {
    name: 'hello',
    components: {

      Dashboard
    },
    data() {
      return {

      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: White;
  }
</style>