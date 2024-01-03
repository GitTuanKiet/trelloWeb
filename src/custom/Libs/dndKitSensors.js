import { MouseSensor as DndKirMouseSensor, TouchSensor as DndKitTouchSensor } from '@dnd-kit/core'

const handler = ({ nativeEvent: event }) => {
  let cur = event.target

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement
  }

  return true
}

export class MouseSensor extends DndKirMouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }]
}

export class TouchSensor extends DndKitTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }]
}