<template>
  <div class="sc-rule" :class="[mode]">
    <div class="sc-rule__item sc-rule__item-a"><icon :src="rule.itemA.icon"/></div>
    <div class="sc-rule__distance">{{rule.distance}}</div>
    <div class="sc-rule__item sc-rule__item-b" ><icon :src="rule.itemB.icon"/></div>

  </div>
</template>
<script>
import Icon from './Icon'

export default {
  name: 'Rule',
  props: {rule: {type: Object}},
  components: {Icon},
  computed: {
    mode() {
      return this.rule.axis === 'floor' ? 'is-horizontal' : 'is-vertical'
    }
  }
}
</script>
<style lang="scss">
.sc-rule {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  padding: 5px;

  &__item {
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__distance {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    width: 70px;
    font-weight: bold;
    font-size: 32px;
  }
  &.is-horizontal {
    flex-direction: row;
    height: 70px;
  }
  &.is-vertical {
    flex-direction: column;
    width: 70px;
  }
}
</style>