import PowiainaNum from "powiaina_num.js";
import { player } from "../saves";
import { diff } from "../game-loops";

export function infinityTime() {
    return new PowiainaNum(1).div(pib_start().pow(3/20)).div(3/2000)
}

export function preInfinityBase(x: PowiainaNum) {
    return x.min(infinityTime()).mul(3/2000).mul(pib_start().pow(3/20)).neg().add(1).rec().pow(20/3).mul(pib_start());
}
export function pib_start() {
    return new PowiainaNum(1).mul(player.fd.inf_bases.add(1))
}
export function infGenLoop() {
    if (player.plot.terminal_found) {
        player.fd.inf_gen_t = player.fd.inf_gen_t.add(diff).min(infinityTime());
        if (preInfinityBase(player.fd.inf_gen_t).isInfi()) {
            player.fd.inf_bases = player.fd.inf_bases.add(1);
            player.fd.inf_gen_t = player.fd.inf_gen_t.sub(infinityTime());
        }
    }
}