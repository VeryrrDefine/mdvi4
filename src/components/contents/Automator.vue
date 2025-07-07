<script lang="ts" setup>
import { VEnvironment, evalProgram } from '../../lib/vrd-lang/evaluator.ts'
import { Lexer } from '../../lib/vrd-lang/lexer.ts'
import { Parser } from '../../lib/vrd-lang/parser.ts'
import { ref } from 'vue'
import { temp } from '../../core/temp.ts'
import { player } from '@/core/saves/index.ts'

const result = {
  get value() {
    return temp.automatorresult
  },
  set value(x) {
    temp.automatorresult = x
  },
}
function runcode() {
  result.value = ''
  const lexer = new Lexer(player.scripts[temp.curScript])
  const parser = new Parser(lexer)
  const program = parser.parseProgram()
  // result.value = result.value+"Code parsed to AST.\n"
  const env = new VEnvironment()
  evalProgram(program.statements, env)
  //result.value = result.value+"AST evaluated.\n"
  //result.value = result.value+"Result: "+evaluated.inspect()+"\n"
}
</script>

<template>
  <div>
    <div>
      <h1>Read before writing codes</h1>
      <ul>
        <li>
          <b>Set variable</b>
          <pre>let var_name = exprssion;</pre>
          variable's name is only named with <b>/[a-zA-Z_]/</b>
        </li>
        <li>
          <b>Numbers</b>
          <pre>3</pre>
          There are only integerss
        </li>
        <li>
          <b>Strings</b>
          <pre>
"one-line string" "a cross
line string"</pre
          >
          The string has 2 types: one-line string and cross-line Strings
        </li>
        <li>
          <b>If-else</b>
          <pre>
if (condition) {
          statements;
} else {
          statements;
}</pre
          >
          The if-else statement can also be an expression, like
          <pre>let a = if(3){1}</pre>
          , a=1.
        </li>
      </ul>
    </div>
    <button @click="runcode">Run code</button>
    <input type="number" v-model="temp.curScript" /><br />
    <textarea v-model="player.scripts[temp.curScript]"></textarea>
    <pre v-html="result.value"></pre>
  </div>
</template>

<style scoped>
textarea {
  width: 300px;
  height: 300px;
}
</style>
