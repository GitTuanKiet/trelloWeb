import { useCallback } from 'react'

// ==============================|| CALLBACK HOOKS ||============================== //

const useCallbackHook = (callback, dependencies) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, dependencies)
}

export default useCallbackHook