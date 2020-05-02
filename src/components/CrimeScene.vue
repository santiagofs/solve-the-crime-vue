<template>
  <div>
    <table>
      <tr v-for="(row, x) in grid" :key="x">
        <td v-for="(cell, y) in row" :key="y">
          <crime-scene-room :elements="cell" />
        </td>
      </tr>
    </table>
    <h1>{{isUnique}}</h1>
    <button @click="applyRule(0)">Rule 0</button>
    <button @click="applyRule(1)">Rule 1</button>
    <button @click="applyRule(2)">Rule 2</button>
    <button @click="applyRule(3)">Rule 3</button>
  </div>
</template>

<script>
import {
  getEmptyRooms,
  // buildStartMatrix,
  applyRule,
  checkUniqueness
} from '@/crime-scene.helpers'

import CrimeSceneRoom from '@/components/CrimeSceneRoom'
import { Level, Scenario } from '../models'

export default {
  name: 'CrimeScene',
  components: { CrimeSceneRoom },
  props: {
    level: {type: Level, default: null}
  },
  data() {
    return {
      scenario: new Scenario(this.level)
    }
  },
  computed: {
    grid() {
      console.log('the grid')
      // const rooms = getEmptyRooms(1)
      // this.elements.forEach(e => {
      //   e.matrix.forEach(p => {
      //     if (p.enabled) rooms[p.y][p.x].push(e.name)
      //   })
      // })
      // return rooms
      return []
    },
    rules() {
      return [
        { a: 0, b: 2, axis: 'x', distance: 1 },
        { a: 1, b: 3, axis: 'y', distance: 1 },
        { a: 0, b: 3, axis: 'y', distance: '?' }
      ]
    },
    isUnique() {
      return checkUniqueness(this.elements)
    }
  },
  methods: {
    applyRule(ndx) {
      const rule = this.rules[ndx]
      const elems = applyRule(this.elements, rule)
      // this.elements[rule.a] = elems.a
      // this.elements[rule.b] = elems.b
      // Vue.set(this.elements[rule.a], elems.a)
      this.$set(this.elements[rule.b], 'matrix', elems.b)
      this.$set(this.elements[rule.a], 'matrix', elems.a)
      console.log(this.elements)
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
