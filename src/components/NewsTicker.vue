<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import news from '@/news'

interface NewsMessage {
  id: string
  text: string
  unlocked?: boolean
  dynamic?: boolean
  reset?: () => void
  onClick?: () => string | undefined
}

const ticker = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)

const recentTickers = ref<string[]>([])
const currentNews = ref<NewsMessage | null>(null)
const nextNewsMessageId = ref<string>('')
const timers = {
  delay: 0,
  scroll: 0,
  dynamic: 0,
}

const randomElement = <T,>(arr: T[]): T | undefined =>
  arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : undefined

const clearAllTimers = () => {
  clearTimeout(timers.delay)
  clearTimeout(timers.scroll)
  clearInterval(timers.dynamic)
  timers.delay = 0
  timers.scroll = 0
  timers.dynamic = 0
}

const updateDynamicContent = () => {
  if (currentNews.value?.dynamic && line.value) {
    line.value.innerHTML = currentNews.value.text
  }
}

watch(currentNews, (newVal) => {
  if (newVal?.dynamic) {
    clearInterval(timers.dynamic)
    updateDynamicContent()
    timers.dynamic = window.setInterval(updateDynamicContent, 1000 / 60)
  } else {
    clearInterval(timers.dynamic)
  }
})

const restart = () => {
  clearAllTimers()
  if (document.hidden) return
  prepareNextMessage()
}

const prepareNextMessage = () => {
  if (!line.value) return

  const canShow = (item: NewsMessage) => item.unlocked ?? true // && !recentTickers.value.includes(item.id);

  if (nextNewsMessageId.value) {
    const specified = news.find((m) => m.id === nextNewsMessageId.value)
    if (specified) {
      currentNews.value = specified
      nextNewsMessageId.value = ''
    }
  }

  // console.log(news.filter(canShow))

  let temp = randomElement(news.filter(canShow))

  if (!temp) return

  currentNews.value = temp
  // recentTickers.value.push(currentNews.value.id)
  // while (recentTickers.value.length > player.options.news.repeatBuffer) {
  //   recentTickers.value.shift()
  // }

  currentNews.value.reset?.()

  line.value.innerHTML = currentNews.value.text
  line.value.style.transitionDuration = '0ms'
  line.value.style.transform = 'translateX(0)'

  timers.delay = window.setTimeout(scrollMessage, 1000)
}

const scrollMessage = () => {
  if (!line.value || !ticker.value || !currentNews.value) return

  const scrollSpeed = /*player.options.news.speed*/ 1 * 100
  const scrollDuration = (ticker.value.clientWidth + line.value.clientWidth) / scrollSpeed

  line.value.style.transitionDuration = `${scrollDuration}s`
  line.value.style.transform = 'translateX(-100%)'
  let scrolls = scrollDuration * 1000
  if (currentNews.value.id == 'a9') scrolls = 5000
  timers.scroll = setTimeout(prepareNextMessage, scrolls)
}

const onLineClick = () => {
  const updatedText = currentNews.value?.onClick?.()
  if (updatedText && line.value) {
    line.value.innerHTML = updatedText
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', restart)
  restart()
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', restart)
  clearAllTimers()
})
</script>

<template>
  <div ref="ticker" class="news-ticker">
    <span ref="line" class="news-line news-ticker__line" @click="onLineClick" />
  </div>
</template>

<style lang="scss">
.news-ticker {
  display: flex;
  overflow: hidden;
  height: 100%;
  a {
    text-decoration: underline;
  }
}

.news-ticker__line {
  padding-left: 100%;
  font-size: 18px;
  transition: transform linear;
}

.news-line {
  display: inline-block;
  white-space: nowrap;
  text-align: left;
  -webkit-user-select: none;
  user-select: none;
}
</style>
