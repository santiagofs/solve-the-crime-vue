<template>
  <div class="home">
    <CrimeScene :level="level" />
  </div>
</template>

<script>
// @ is an alias to /src
import CrimeScene from '@/components/CrimeScene.vue'

import {level2} from '../defs/levels'
export default {
  name: 'home',
  components: {
    CrimeScene
  },
  data() {
    return {
      level: level2
    }
  }
}
</script>
