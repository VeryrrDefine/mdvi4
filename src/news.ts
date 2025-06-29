import { replaceQmoji } from './core/baixie-replace'

export default [
  {
    id: 'a1',
    text: '以防你不知道，新闻是增量游戏里面最重要的一部分，因为你可以看到作者在制作废话。',
  },
  {
    id: 'a2',
    text: '伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：伟大的news曾经说过：',
  },
  {
    id: 'a3',
    text: '这中间是一条news专属的路，不知道啥时候有绿灯红灯。',
  },
  {
    id: 'a4',
    text: 'àáâãäåæçèéêëēìíîǐïīðñòóõǒôöōøœùúǔûüūýþšÿ',
  },
  {
    id: 'a5',
    text: '此条新闻由于含有R18级内容，已被禁止播出。',
  },
  {
    id: 'a6',
    text: '<$jx><$jx><$jx><$jx><$jx>',
  },
  {
    id: 'a7',
    text: 'We will fly away, far away, 或许会彷徨，或许会受伤<$bx>',
  },
  {
    id: 'a8',
    text: '<$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx><$bx>',
  },
  {
    id: 'a9',
    text: '<span class="gunmu">滚木</span>@',
  },
  {
    id: 'a10',
    text: '< 湃 射 > 八 拜 氵身寸 争 霸  拜 连  ア ッ プ：[CENSORED]',
  },
  {
    id: 'a11',
    text: '什么实体，你拿个消防斧不就乱杀了，我特么直接一路砍穿level ！，还用逃跑？',
  },
  {
    id: 'a12',
    text: 'sudo rm -rf /* --no-preserved-root',
  },
  {
    id: 'a13',
    text: 'Je ne sais pas',
  },
  {
    id: 'a14',
    text: 'You have 4.79 replicators. Your replicators is multiplied by 0.23 every second.',
  },
  {
    id: 'a15',
    text: '超大蚂蚁来袭<span style:"font-size: 5em;">🐜🐜🐜🐜🐜</span>',
  },
  {
    id: 'a16',
    text: '我是谁？我从哪来？我又要到哪里去？',
  },
  {
    id: 'a17',
    text: '“还有你把所有代码全写到index.html里面是啥意思” “隔壁ad把全部js代码放两个js文件里 这算什么意思[发怒][发怒]”',
  },
  {
    id: 'a18',
    text: 'Arcaea官网的购买专辑按钮被未知的伟力入侵，点击后竟成某贝者十専网站',
  },
  {
    id: 'a19',
    text: "太过于不平衡，-2"
  },
  {
    id: 'a20',
    text: `les <$bx>s et les ❓s`
  },
  {
    id: 'a21',
    text: '你奶奶了个三角篓子的，❓❓这个❓❓， 扑腾一下子直接❓❓❓❓，把❓❓❓❓❓❓❓❓❓❓❓裤衩子都给崩飞了，可以说❓了个五马分尸，万朵桃花开呀'
  },
  {
    id: 'a22',
    text: "Click here to get here"
  },
  {
    id: 'a23',
    text: "src/news.ts [+]             94,12          Bot"
  },
  {
    id: 'a24',
    text: "衫脚福闻"
  },
  {
    id: 'a25',
    text: "Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: Today's news: "
  },
  {
    id: 'a26',
    text: "Use void 0 instead of undefined, because you never know is undefined defined"
  },
  {
    id: "a27",
    text: "you actually did it. what a maniac you are. congratulations. mind blown. -- someone i don't know"
  }
].map((news) => {
  return {
    id: news.id,
    text: replaceQmoji(news.text),
  }
})
