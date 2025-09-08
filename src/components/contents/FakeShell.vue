<script setup lang="ts">
import { ref } from 'vue';
import CenterDiv from '../ui/CenterDiv.vue';
import { temp } from '@/core/temp';
import { devstdinContent } from '@/core/fakeshell/filesystem';

const stdin = ref<HTMLInputElement|null>(null);
function stdininput(ev: Event){
    if (ev instanceof KeyboardEvent) {
        //console.log(ev)
        ev.preventDefault();
        if (ev.ctrlKey==false && /^[\x20-\x7e]$/.test(ev.key)) {
            devstdinContent.value += ev.key;
        } 
        if (ev.ctrlKey==true && /^[A-Za-z\[\\\]\^_@]$/.test(ev.key)){
            let lowercase = ev.key.toUpperCase();
            let charcode = lowercase.charCodeAt(0)
            if (0x40<=charcode&&charcode<=0x5f){
                devstdinContent.value += String.fromCharCode(charcode-0x40);
            }
        }
        if (ev.key == "Backspace") {
            devstdinContent.value += "\x7f"
            //devstdinContent.value = devstdinContent.value.substring(0, devstdinContent.value.length-1)
        }
        if (ev.key == "Enter") {
            devstdinContent.value += "\x04"
        }
        if (ev.key == "ArrowUp") {
            devstdinContent.value += "\x1B[A"
        }
        if (ev.key == "ArrowLeft") {
            devstdinContent.value += "\x1B[D"
        }
        if (ev.key == "ArrowDown") {
            devstdinContent.value += "\x1B[B"
        }
        if (ev.key == "ArrowRight") {
            devstdinContent.value += "\x1B[C"
        }
        if (ev.key == "Escape") {
            devstdinContent.value += "\x1B"
        }
        if (ev.key == "F2") {
            devstdinContent.value += "\x1BOQ"
        }
        if (ev.key == "Insert") {
            devstdinContent.value += "\x1B[2~"
        }
        if (ev.key == "Delete") {
            devstdinContent.value += "\x1B[3~"
        }
        if (ev.key == "Home") {
            devstdinContent.value += "\x1B[H"
        }
        if (ev.key == "End") {
            devstdinContent.value += "\x1B[F"
        }
        if (ev.key == "PageUp") {
            devstdinContent.value += "\x1B[5~"
        }
        if (ev.key == "PageDown") {
            devstdinContent.value += "\x1B[6~"
        }
        stdin.value!.value = "";
    }
}
function replaceControlCharacters(str: string) {
    return str
    .replace(/[\x00-\x09\x0b\x0c\x0e-\x1f]/g, function(substring){
        return "<span style=\"color: yellow\">^"+String.fromCharCode(substring.charCodeAt(0)+0x40)+"</span>"
    }).replace(/[\x7f-\xff]/g, function(substring){
        return "<span style=\"color: yellow\">&lt;"+substring.charCodeAt(0).toString(16)+"&gt;</span>"
    })
}
</script>

<template>
    <CenterDiv @keydown="stdininput">
        <p>一个神秘的控制台...不知道谁将他放在这里。</p>
        <p>这个系统似乎太过老旧，你不知道如何操作。</p>
        <input placeholder="输入" ref="stdin"></input>
        <p>这个输入框旁边放着一块键盘，试着往里面输入一些东西...?</p>
        <p>{{ temp.BSCtips }}</p>
        <pre v-html="replaceControlCharacters(temp.baixieSystemConsole)"></pre>
    </CenterDiv>
</template>

<style lang="css" scoped>
pre {
    text-align: left;
    width: 1000px;
    height: 900px;
    margin: auto;
    font-size: 20px;
    line-height: 20px;
    border: 2px solid blue;
    background-color: black;
}
</style>