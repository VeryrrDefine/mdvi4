<script setup lang="ts">
import { ref } from 'vue';
import CenterDiv from '../ui/CenterDiv.vue';
import { temp } from '@/core/temp';
import { devstdinContent } from '@/core/fakeshell/filesystem';

const stdin = ref<HTMLInputElement|null>(null);
function stdininput(ev: Event){
    if (ev instanceof KeyboardEvent) {
        ev.preventDefault();
        if (/^[\x20-\x7e]$/.test(ev.key)) {
            devstdinContent.value += ev.key;
        } 
        if (ev.key == "Backspace") {
            devstdinContent.value = devstdinContent.value.substring(0, devstdinContent.value.length-1)
        }
        if (ev.key == "Enter") {
            devstdinContent.value += "\x04"
        }
        stdin.value!.value = "";
        console.log(ev.key)
    }
}
</script>

<template>
    <CenterDiv @keydown="stdininput">
        <p>一个神秘的控制台...不知道谁将他放在这里。</p>
        <p>这个系统似乎太过老旧，你不知道如何操作。</p>
        <input placeholder="输入" ref="stdin"></input>
        <p>这个输入框旁边放着一块键盘，试着往里面输入一些东西...?</p>
        <p>{{ temp.BSCtips }}</p>
        <pre v-html="temp.baixieSystemConsole+devstdinContent+'_'"></pre>
    </CenterDiv>
</template>

<style lang="css" scoped>
pre {
    text-align: left;
    width: 1000px;
    height: 900px;
    margin: auto;
    font-size: 20px;
    border: 2px solid blue;
    background-color: black;
}
</style>