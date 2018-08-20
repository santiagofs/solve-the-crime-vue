<template>
  <span>
    <span v-for="element in elements" :key="element">{{element}}</span>
  </span>
</template>
<script>
export default {
  name: 'CrimeSceneRoom',
  props: ['elements'],
  computed: {}
}
</script>
