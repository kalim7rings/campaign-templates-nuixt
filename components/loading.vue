<template lang="html">
  <div class="loading-page" v-if="loading">

    <div class="loading-container">
        <img :src="imageLoader" alt="Loading..." />
    </div>

  </div>
</template>

<script>
    import loaderImage from '~/assets/images/hdfc-loader.gif';

    export default {
      data: () => ({
        loading: false,
        imageLoader : loaderImage,
      }),
      methods: {
        start () {
          this.loading = true;
        },
        finish () {
          this.loading = false
        }
      }
    }
</script>

<style scoped>
.loading-page {
    z-index: 1000;
    border: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgb(255, 255, 255);
    opacity: 0.9;
    cursor: wait;
    position: fixed;
}

.loading-container{
    width: 100%;
    text-align: center;
    top: 33%;
    position: fixed;
}
</style>