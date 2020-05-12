<template>
  <div>
    <table>
      <tr v-for="(floor, x) in grid" :key="x">
        <td v-for="(room, y) in floor" :key="y">
          <crime-scene-room :room="room" :solution="scenario.solution" />
        </td>
      </tr>
    </table>
    <h1>{{isUnique}}</h1>
    <button @click="createRule">Create Rule</button>
    <button @click="createRules">Create Rules</button>
    <button @click="hint">Hint</button>
    <ul>
      <li v-for="(rule, ndx) in scenario.solution.rules" :key="ndx" @click="applyRule(rule)">
        {{rule}}
      </li>
    </ul>

  </div>
</template>

<script>
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
      return this.scenario.rooms
    },
    rules() {
      return [
        { a: 0, b: 2, axis: 'x', distance: 1 },
        { a: 1, b: 3, axis: 'y', distance: 1 },
        { a: 0, b: 3, axis: 'y', distance: '?' }
      ]
    },
    isUnique() {
      return false
      // return checkUniqueness(this.elements)
    }
  },
  methods: {
    applyRule(rule) {
      this.scenario.solution.applyRule(rule)
    },
    createRule() {
      this.scenario.solution.createRule()
      this.scenario.solution.applyRules(false)
    },
    createRules() {
      this.scenario.solution.createRules()
    },
    hint() {
      this.scenario.solution.hint()
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
