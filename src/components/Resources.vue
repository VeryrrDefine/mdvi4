<script lang="ts" setup>
import formater from '@/lib/formater.ts'
import {player} from '@/core/saves'
</script>

<template>
    <div class="ress">
        <div class="res">{{formater(player.linePoints)}} LP</div>
    </div>
</template>

<style lang="css" scoped>
.res {
    border: 1px solid #0000ff;
    height: 30px;
    max-width: 150px;
    padding: 3px;
    line-height: 30px;
}
.ress{
    display:flex;
    justify-content: center;
}
</style>