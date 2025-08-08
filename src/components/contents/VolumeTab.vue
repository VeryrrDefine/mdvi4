<script setup lang="ts">
import { player } from "@/core/saves/";
import { temp } from "@/core/temp";
import formater from "@/lib/formater";
</script>

<template>
  <div class="text-center div-center">
    <p style="text-align: center;color: grey;">
      <img style="height: 1em; vertical-align: middle;" src="/baixie.png">。<br>
    </p>
      <p style="text-align: center;color: grey;">不过，我们不希望每升一个维度都会重置之前的内容。</p>
    <p>我发现了一个神秘的碎片，上面写着“拜谢”，还有一个Copy标识...不知道这是干什么用的</p>
    <p>不过上面有一个“How can we break the hard cap?”，</p>
    <p>可能是和我刚才遇到的1e250 cap有关，因为这是<span class="red">二重硬上限</span></p>
    <p v-if="player.plot.what_is_this_shard">? 这是什么，我不应该来到这里？<span class="red" style="cursor: pointer;" @click="player.plot.yes_you_shouldnt_go_there = true">是吗？</span></p>
    <p v-if="player.plot.yes_you_shouldnt_go_there"><span class="red">是的，你不应该来到这里，你应该先...</span></p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=10.0" class="red">你现在的数字变得非常大，我无法...</p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=12.0 && player.plot.fake_hard_resets==0" class="red">...错误的，非常小，看起来你的点数是<vue-latex :expression="formater(player.points.rec())"></vue-latex>，对吧？</p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=12.0 && player.plot.fake_hard_resets>=1" class="red">你就是...上次那个...?</p>
    
    <template v-if="player.plot.fake_hard_resets==0">
      <p v-if="temp.yesyoushouldnt_go_there_counter>=15.0">这不就是<vue-latex :expression="formater(player.points.rec())"></vue-latex>吧，很大，怎么了？</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=18.0" class="red">你错了，其实是<vue-latex :expression="formater(player.points.rec())+'^{-1}'"></vue-latex></p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=20.0" class="red">因为这个数字的前面有个除号。</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=22.0" class="red">很快你就要归零了。</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=30.0" class="red">哈哈哈，你马上就要...</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=32.0" class="red">?</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=33.0" class="red">?</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=34.0 && temp.yesyoushouldnt_go_there_counter<=35.0" class="red">我</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=35.0 && temp.yesyoushouldnt_go_there_counter<=36.0" class="red">我勒</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=36.0 && temp.yesyoushouldnt_go_there_counter<=37.0" class="red">我勒个</p>
      <p v-if="temp.yesyoushouldnt_go_there_counter>=37.0 && temp.yesyoushouldnt_go_there_counter<=38.0" class="red">我勒个去，</p>
    
    </template>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=38.0" class="red">我的终端出bug了，跑了</p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=38">总而言之，这个人像是一个boss，据说它拥有超越<span class="yellow">槿春</span>Hyperspring的能力</p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=38">据说<span class="yellow">槿春</span>初生时有操控无限能量的能力，那这个“boss”岂不是操控...</p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=38"><a href="https://tieba.baidu.com/p/9868024518">作者提醒：此处槿春并非主要人物，只是作对比的手法，除了这一次它永远不再出现</a></p>
    <p v-if="temp.yesyoushouldnt_go_there_counter>=38">那个“boss”所说的终端到底是什么...</p>
    <img src="/something_shard_32050.png">
    <button v-if="!player.plot.what_is_this_shard" @click="player.plot.what_is_this_shard = true">Click to see the back or this image</button>
    <img v-else src="/something_shard_32050_back.png">
    <img src="/something_shard_32051.png">
    <p v-if="player.plot.fake_hard_resets>=5">完成5次硬重置了，不过为什么不会重置整个内容啊？</p>
    <p v-if="player.plot.fake_hard_resets>=5">Endgame Reached</p>
  </div>
</template>