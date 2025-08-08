import { ref } from "vue";
import { temp } from "../temp";
import { BaixieSystemBXSH } from "./bxsh";
import { BaixieSystemReadfile } from "./filesystem";
import { player } from "../saves";

export async function BaixieSystemEntry() {
    player.plot.terminal_discovered=true;
    while (1){
        BaixieSystemOutput(`Baixie system\n\nbaixie login:`);
        let result = await BaixieSystemReadfile("/dev/stdin") as string;
        
        if (result=="player" && player.plot.terminal_discovered) {
            pwd.value = ["home", result];
            await BaixieSystemBXSH();
            BaixieSystemClear();
        } else {
            BaixieSystemOutput(`Invalid login for user ${result}\n`)
        }
        if (!player.plot.terminal_discovered) {
            temp.BSCtips = temp.BSCattempts > 20 ? "我刚才看到无穷生成器的旁边好像有个大门，不知道要怎么触发":temp.BSCattempts > 10 ? "但是我没有找到。":temp.BSCattempts > 5 ? "这里按理来说应该有一些用户手册的信息的， 对吧？":"emmm...这个东西应该怎么操作啊？"
            temp.BSCattempts++
        }
    }
}
export function BaixieSystemOutput(x: string) {
    temp.baixieSystemConsole += x;
}
export function BaixieSystemClear() {
    temp.baixieSystemConsole = "";
}

export let pwd = ref(["home"]);