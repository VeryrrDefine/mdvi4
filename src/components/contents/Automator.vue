<script lang='ts' setup>
import { VEnvironment, evalProgram } from '../../lib/vrd-lang/evaluator.ts';
import { Lexer } from '../../lib/vrd-lang/lexer.ts';
import { Parser } from '../../lib/vrd-lang/parser.ts';
import { ref } from 'vue'
import {temp} from '../../core/temp.ts'
const code = ref(`
&/
&/
&/
&/ 等后期再开放这个自动机
&/
&/
&/


&/ Veryrrd language
&/ basics

&/ variable:
let a = 3

&/ return:
&/ make the program ended up instantly, or return a value in function
&/ return ...

&/ if statement:
&/ if (expression) {statements} else {statements}

&/ you can also use let ... = if(...){...}, like javascript ?: syntax

&/ comment is start with '&/'


&/ function: fn(...){} function(...){}

`)
const result = {
  get value() { return temp.automatorresult },
  set value(x) { temp.automatorresult = x}
}
function runcode(){
  result.value=""
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
    <button @click='runcode'>Run code</button> <br>
    <textarea v-model='code' v-html='code'></textarea>
    <pre v-html="result.value"></pre>
  </div>
</template>

<style scoped>
textarea {
  width: 300px;
  height: 300px;
}
</style>
