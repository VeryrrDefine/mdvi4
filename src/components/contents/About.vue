<script lang="ts" setup>
import ModalService from '@/utils/Modal';

const changelogs = [
  {
    version: '4.0.666',
    log: "more interesting content"
  },
  {
    version: '4.0.3-beta.4',
    log: "balanced"
  },
  {
    version: '4.0.3-beta.1',
    log: 'feat: more challenges',
  },
  {
    version: '4.0.2',
    log: 'feat: challenges',
  },
  {
    version: '4.0.2-beta.3',
    log: 'feat: automator array update',
  },
  {
    version: '4.0.2-beta.2',
    log: 'feat: game boost',
  },
  {
    version: '4.0.2-beta.1',
    log: 'feat: panel reset & power undone: offlinedtime',
  },
  {
    version: '4.0.1',
    log: 'feat: upgrades, panel undone: galaxy click cloud save',
  },
  {
    version: '4.0.0.2',
    log: 'feat: linepoints, softcap, iOS10+ compatibility',
  },
  {
    version: '4.0.0.1',
    log: 'feat: Automator, modal,newsticker, points, autobuyers, updimensions',
  },
  { version: '4.0.0.1 beta 1', log: 'feat: Tabs, subtabs, points, game-loading, Basic UI' },
]

function a() {
  ModalService.show({
    title: "???",
    content: "<span style='color: red;'>???</span>"
  })
}
function b() {
  ModalService.show({
    title: "暂不支持32位",
    content: "暂时不支持32位<span style='color: red;'>。</span>"
  })
}
</script>

<template>
  <div>
    <h1>基本信息</h1>
    <p>作者: VeryrrDefine</p>
    <p>版本: {{ changelogs[0].version }}</p>
    <p></p>
    <p>大数库使用PowiainaNum.js by VeryrrDefine</p>
    <p>数字显示方面使用format-powiainanum.js by VeryrrDefine</p>
    <p>存档编码解码过程使用pako</p>

    <p></p>
    <p></p>
    <p>css与js兼容性提醒:</p>

    <p>
      此项目使用了@vitejs/plugin-legacy， 兼容了iOS10+， 在较老版本运行上存在css显示错乱的问题。
    </p>
    <h1>其他的!</h1>
    <h3>Downloads</h3>
    <p>Linux aarch64 (for android) | <a href="javascript:;" @click="a">Download</a></p>
    <p>Linux armv7l (for android) | <a href="javascript:;" @click="b">Download</a></p>
  </div>
</template>
