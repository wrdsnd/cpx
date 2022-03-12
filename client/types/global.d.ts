import { ComponentType } from 'react'
import type { NextPage } from 'next'

declare global {
  type CpxPageWithLayout = NextPage & {
    Layout?: ComponentType
  }
}
