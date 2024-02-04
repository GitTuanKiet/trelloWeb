import { memo } from 'react'

// ==============================|| MEMOIZE COMPONENT ||============================== //

const MemoizedComponent = (Component) => {
  return memo(Component)
}

export default MemoizedComponent