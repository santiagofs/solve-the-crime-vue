/* eslint-disable no-console */

export const copyObject = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const collections = () => {
  return {
    a: ['A', 'B', 'C'],
    b: ['X', 'Y', 'Z']
  }
}
export const realms = {
  a: [0],
  b: [1]
}
export const boundaries = {
  x: 3,
  y: 2
}
export const levelDefinitions = {
  1: {
    boundaries: { x: 3, y: 2 },
    collections: [collections().a, collections().b],
    realms: [[0], [1]]
  }
}
export const itemDefinition = (itemName, boundaries, realms) => {
  const ret = { name: itemName, matrix: [] }
  for (let x = 0; x < boundaries.x; x++) {
    for (let y = 0; y < boundaries.y; y++) {
      ret.matrix.push({ x, y, enabled: realms.indexOf(y) !== -1 })
    }
  }
  return ret
}

export const buildStartMatrix = level => {
  const def = levelDefinitions[level]
  const ret = []
  for (let c = 0; c < def.collections.length; c++) {
    const collection = def.collections[c]
    for (let e = 0; e < collection.length; e++) {
      ret.push(itemDefinition(collection[e], def.boundaries, def.realms[c]))
    }
  }
  return ret
}

export const getEmptyRooms = level => {
  const rooms = []
  const boundaries = levelDefinitions[level].boundaries

  for (let y = 0; y < boundaries.y; y++) {
    rooms[y] = []
    for (let x = 0; x < boundaries.x; x++) {
      rooms[y][x] = []
    }
  }
  return rooms
}

export const getMatrix = () => {
  const matrix = []
  const colIndexes = ['a', 'b']
  const cols = collections()

  for (let y = 0; y < boundaries.y; y++) {
    matrix[y] = []
    for (let x = 0; x < boundaries.x; x++) {
      let cell = []
      colIndexes.forEach(c => {
        if (realms[c].indexOf(y) !== -1) cell = cell.concat(cell, cols[c])
      })
      matrix[y][x] = cell
    }
  }
  return matrix
}

// export const applyRule = rule => {
//   const otherAxis = rule.axis === 'x' ? 'y' : 'x';
//   // const maxIndentA = maxIndexEnabled(rule.a, rule.axis, 1) // ToDo: replace distance
//   // const minIndentA = minIndexEnabled(rule.a, rule.axis, 1) // ToDo: replace distance

//   rule.b.matrix.forEach(b => {
//     const exists = rule.a.matrix.filter(a => {
//       return (a.enabled) && (a[otherAxis] === b[otherAxis]) && (rule.distance === '?' ? b[rule.axis] > a[rule.axis] : a[rule.axis] + rule.distance === b[rule.axis])
//     }).length > 0;
//     if (!exists) {
//       // b.enabled = false
//     }
//   })

// }

const _applyRuleToB = (b, a, axis, distance) => {
  const otherAxis = axis === 'x' ? 'y' : 'x'
  let changed = false

  b.matrix.forEach(pb => {
    if (!pb.enabled) return
    console.log(pb)
    const exists =
      a.matrix.filter(pa => {
        console.log(pb, pa, pb[axis] > pa[axis])
        if (!pa.enabled) return false // point should be enabled
        if (pa[otherAxis] !== pb[otherAxis]) return false // comparing objects should be in the same line
        if (distance === '?') return pb[axis] > pa[axis]
        return pa[axis] + distance === pb[axis]
      }).length > 0
    if (!exists) {
      pb.enabled = false
      changed = true
    }
  })
  return changed
}
const _applyRuleToA = (a, b, axis, distance) => {
  const otherAxis = axis === 'x' ? 'y' : 'x'
  let changed = false

  a.matrix.forEach(pa => {
    if (!pa.enabled) return
    const exists =
      b.matrix.filter(pb => {
        if (!pb.enabled) return false // point should be enabled
        if (pa[otherAxis] !== pb[otherAxis]) return false // comparing objects should be in the same line
        if (distance === '?') return pb[axis] > pa[axis]
        return pb[axis] - distance === pa[axis]
      }).length > 0
    if (!exists) {
      pa.enabled = false
      changed = true
    }
  })
  return changed
}

export const applyRule = (allElements, rule) => {
  const a = copyObject(allElements[rule.a])
  const b = copyObject(allElements[rule.b])
  console.log('ab', a, b)
  let changed = true

  while (changed) {
    changed = false
    if (_applyRuleToB(b, a, rule.axis, rule.distance)) changed = true
    if (_applyRuleToA(a, b, rule.axis, rule.distance)) changed = true
  }
  console.log('changed', changed)
  return { a: a.matrix, b: b.matrix }
}

export const checkUniqueness = allElements => {
  for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].matrix.filter(p => p.enabled).length > 0) return false
  }
}
/* eslint-enable no-console */
