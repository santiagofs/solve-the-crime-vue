<template>
  <div class="home">
    <CrimeScene />
  </div>
</template>

<script>
// @ is an alias to /src
import CrimeScene from '@/components/CrimeScene.vue'

export default {
  name: 'home',
  components: {
    CrimeScene
  }
}
</script>
