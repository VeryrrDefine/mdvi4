export interface Tab {
  curTab: [number, number]
  memoryTab: number[]
}

export interface Tabset {
  tabs: {
    text: string
    id: number
    subtabs: {
      text: string
      component: DefineComponent<{}, {}, any>
      id: number
      unlocked?: () => boolean
    }[]
    unlocked?: () => boolean
  }[]
}

export function changeTab(tab: Tab, primTab: number) {
  tab.curTab[0] = primTab
  if (!tab.memoryTab[primTab]) {
    tab.memoryTab[primTab] = 0
  }
  tab.curTab[1] = tab.memoryTab[primTab]
}

export function changeSubtab(tab: Tab, subTab: number, primTab: number) {
  tab.curTab[1] = tab.memoryTab[primTab] = subTab
}

import Place from '@/components/contents/Place.vue'
import Options from '@/components/contents/Options.vue'
import About from '@/components/contents/About.vue'
import Automator from '@/components/contents/Automator.vue'
import Visual from '@/components/contents/Visual.vue'
import PointsTab from '@/components/contents/PointsTab/PointsTab.vue'
import LinesTab from '@/components/contents/LinesTab/LinesTab.vue'
import type { DefineComponent } from 'vue'
import { player } from '../saves'
import PanelTab from '@/components/contents/PanelTab/PanelTab.vue'
import OfflinedTime from '@/components/contents/OfflinedTime.vue'
export const tabs: Tabset = {
  tabs: [
    {
      text: 'Main',
      id: 0,
      subtabs: [
        {
          text: 'Main',
          component: PointsTab,
          id: 0,
        },
        {
          text: 'Line',
          component: LinesTab,
          id: 1,
          unlocked() {
            return player.curDimension >= 1
          },
        },
        {
          text: 'Panel',
          component: PanelTab,
          id: 2,
          unlocked() {
            return player.curDimension >= 2
          },
        },
      ],
    },
    {
      text: 'Misc.',
      id: 1,
      subtabs: [
        {
          text: 'Save',
          component: Options,
          id: 0,
        },
        {
          text: 'About',
          component: About,
          id: 1,
        },
        {
          text: 'Visual',
          component: Visual,
          id: 2,
        },
        {
          text: 'Offlined Time',
          component: OfflinedTime,
          id: 3,
        },
      ],
    },
    {
      text: 'Auto',
      id: 2,
      subtabs: [
        {
          text: 'Automator',
          id: 0,
          component: Automator,
        },
      ],
    },
  ],
}
