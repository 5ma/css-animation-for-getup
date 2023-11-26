import { useAsapBg } from "@/scripts/modules/bg-asap"
import { useSuperShyBg } from "@/scripts/modules/bg-super-shy"

const asapBg = useAsapBg()
const superShyBg = useSuperShyBg()

export const START: Record<string, () => void> = {
  'ArmDp-zijuc': () => {
    // SuperShy
    superShyBg.set()
  },
  's4Ow55AbdCg': () => {
    // ETA
  },
  'dJdqn5v4Dkw': () => {
    // ASAP
    asapBg.set()
  }
}

export const STOP: Record<string, () => void> = {
  'ArmDp-zijuc': () => {
    // SuperShy
    superShyBg.stop()
  },
  's4Ow55AbdCg': () => {
    // ETA
  },
  'dJdqn5v4Dkw': () => {
    // ASAP
    asapBg.stop()
  }
}