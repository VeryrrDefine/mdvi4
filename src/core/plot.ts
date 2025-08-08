import formater from '@/lib/formater'
import { getPointsCap } from './game'
import { player } from './saves'
import ModalService from '@/utils/Modal'

export interface PlayerPlot {
  at_max_hardcap: boolean
  very_important_news: boolean
  what_is_this_shard: boolean
  yes_you_shouldnt_go_there: boolean
  yysgt_reached:boolean
  terminal_discovered: boolean
  fake_hard_reseted:boolean
  fake_hard_resets: number
}

export function checkPlot() {
  if (player.points.gte(getPointsCap()) && !player.plot.at_max_hardcap) {
    player.plot.at_max_hardcap = true
    ModalService.show({
      title: '你发现了硬上限！',
      content: `在点数超过${formater(getPointsCap())}后，点数将被限制，不能超过这个数字`,
    })
  }
}
