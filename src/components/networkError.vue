<template>
  <div class="networkError" v-if="show">
    <img
      src="/static/imgs/network_error.svg"
    ></img>
  </div>
</template>

<script>
  export default {
    name: "networkError",
    props:['show'],
    created() {
    }
  };
</script>

<style scoped>
  .networkError {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
