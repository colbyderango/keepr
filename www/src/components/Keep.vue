<template>
  <div class="card hoverable" v-on:mouseenter="showAction" v-on:mouseleave="showAction">
    <div class="card-image" v-if="keep.imageUrl">
     <router-link :to="'/keeps/' + keep._id"><img :src="keep.imageUrl"></router-link> 
    </div>
    <div class="card-content">

      <span v-if="!keep.articleLink" class="card-title">{{ keep.title }}</span>
      <social-sharing url="https://colbyderango.com/keepr" inline-template>
        <div>
          <network network="facebook">
            <i class="fa fa-facebook"></i>
          </network>
          <network network="linkedin">
            <i class="fa fa-linkedin"></i>
          </network>
          <network network="pinterest">
            <i class="fa fa-pinterest"></i>
          </network>
          <network network="reddit">
            <i class="fa fa-reddit"></i>
          </network>
          <network network="twitter">
            <i class="fa fa-twitter"></i>
          </network>
        </div>
      </social-sharing>
      <span v-if="keep.articleLink" class="card-title"><a :href="keep.articleLink">{{ keep.title }}</a>
      </span>
    </div>
    <div class="card-action height">
      <span class="left" v-show="hoverShow"><i class="fa fa-eye"></i> {{ keep.views }} | <i class="fa fa-retweet"></i> {{ keep.timesVaulted }}</span>
      <span class="right" v-show="hoverShow"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'keeps',
    props: ['keep'],
    data() {
      return {
        hoverShow: false
      }
    },
    methods: {
      showAction() {
        this.hoverShow = !this.hoverShow;
      }
    }
    }
  

</script>