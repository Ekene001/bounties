declare module "@tabler/icons-react" {
  import * as React from 'react'
  export const IconMenu2: React.FC<React.SVGProps<SVGSVGElement>>
  export const IconX: React.FC<React.SVGProps<SVGSVGElement>>
}

declare module "motion/react" {
  import { RefObject } from 'react'

  export const motion: unknown
  export const AnimatePresence: unknown

  export function useScroll(options?: { target?: RefObject<Element | null>; offset?: string[] }): { scrollY: { get(): number } }

  export function useMotionValueEvent<T = number>(
    motionValue: { get(): T },
    eventName: string,
    handler: (latest: T) => void
  ): void
}
