<script lang="ts" setup>
import { VEnvironment, evalProgram } from '../../lib/vrd-lang/evaluator.ts'
import { Lexer } from '../../lib/vrd-lang/lexer.ts'
import { Parser } from '../../lib/vrd-lang/parser.ts'
import { ref } from 'vue'
import { temp } from '../../core/temp.ts'
const code = ref()
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
  const lexer = new Lexer(code.value)
  const parser = new Parser(lexer)
  const program = parser.parseProgram()
  // result.value = result.value+"Code parsed to AST.\n"

  const env = new VEnvironment()
  const evaluated = evalProgram(program.statements, env)
  //result.value = result.value+"AST evaluated.\n"
  //result.value = result.value+"Result: "+evaluated.inspect()+"\n"
}
</script>

<template>
  <div>
    <button @click="runcode">Run code</button> <br />
    <textarea v-model="code" v-html="code"></textarea>
    <pre v-html="result.value"></pre>
  </div>
</template>

<style scoped>
textarea {
  width: 300px;
  height: 300px;
}
</style>
