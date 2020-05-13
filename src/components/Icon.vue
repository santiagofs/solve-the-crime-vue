<template>
  <div class="sc-icon">
    <img :src="src" />
  </div>
</template>
<script>
export default {
  props: {src: {type: String}},
  data() {
    return {
      base: process.env.BASE_URL
    }
  }
}
</script>
<style lang="scss">
.sc-icon {
  height: 60px;
  width: 60px;
}
</style>