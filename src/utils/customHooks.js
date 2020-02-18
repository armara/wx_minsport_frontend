import { useEffect } from 'react'

const useInitData = (data, handleFetch) => {
  useEffect(() => {
    if (data.length === 0) {
      handleFetch()
    }
  }, [data, handleFetch])
}

const useInitNoCondition = (data, handleEffect) => {
  useEffect(() => {
    handleEffect(data)
  }, [data, handleEffect])
}

const useInitByCondition = (data, handleEffect, customCondition) => {
  useEffect(() => {
    if (customCondition) {
      handleEffect(data)
    }
  }, [data, handleEffect, customCondition])
}

export { useInitData as default, useInitNoCondition, useInitByCondition }
