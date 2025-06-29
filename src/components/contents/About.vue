<script lang="ts" setup>

const changelogs = [
  {
    version: '4.0.2-beta.2',
    log: "feat: game boost"
  },
  {
    version: '4.0.2-beta.1',
    log: "feat: panel reset & power undone: offlinedtime"
  },
  {
    version: '4.0.1',
    log: "feat: upgrades, panel undone: galaxy click cloud save"
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
</script>

<template>
  <div>
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
  </div>
</template>
