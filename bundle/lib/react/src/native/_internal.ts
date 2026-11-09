import type { RunApplicationCallback } from '@violytra/react/types'

export const sBeforeRunApplication = new Set<RunApplicationCallback>()
export const sAfterRunApplication = new Set<RunApplicationCallback>()
