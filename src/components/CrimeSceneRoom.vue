<template>
  <div class="sc-room">
    <!-- <div>{{room.floorNumber}}, {{room.roomNumber}}</div> -->
    <div class="sc-room__collection"  v-for="(collection, ndx) in collections" :key="ndx">
      <span v-for="item in collection" :key="item.name" :class="{'is-active': item.isHere}">{{item.name}}</span>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'CrimeSceneRoom',
  props: ['room', 'solution'],
  computed: {
    collections() {
      const coords = {room: this.room.roomNumber, floor: this.room.floorNumber}

      return this.room.collections.map(col => {
        return col.items.filter(item => this.solution.itemHasRoom(item.name, coords))
          .map(item => ({...item, isHere: _.isEqual(this.solution.solution[item.name], coords)}))
      })
    }
  }
}
</script>
<style lang="scss">
.sc-room {
  display: flex;
  flex-direction: row;
  > div {
    padding: 10px;
  }

  &__collection {
    display: flex;
    flex-direction: column;

    .is-active {
      border: 1px solid #f33;
      color: #f66
    }
  }
}
</style>
