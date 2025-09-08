'use client'
import { useMemo } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers.js'


// Более простая и понятная реализация
export const makeStore = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
    devTools: process.env.NODE_OPERATION_MODE !== 'production',
  })
}

let clientStore

export const initializeStore = (preloadedState) => {
  clientStore = makeStore(preloadedState)
  return clientStore
}

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}