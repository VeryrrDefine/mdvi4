import type PowiainaNum from "powiaina_num.js";
import { diff } from "../game-loops";
import { player } from "../saves"

export const FourD = {
    resGain(name: '1d' | '2d' | '3d' |'4d'): PowiainaNum {
        switch (name) {
            case '1d':
                return player.linePoints.max(1).log10().mul(2);
            case '2d':
                return player.panelPoints.max(1).log10().mul(2);
            case '3d':
                return player.volumePoints.max(1).log10().mul(2);
            case '4d':
                let a= FourD.resGain('1d').add(FourD.resGain('2d')).add(FourD.resGain('3d')).mul(0.001)
                a = a.mul(player.fd.inf_bases.add(1))
                return a;

        }
    },
    loop() {
        if (player.plot.dimens_amount_getting_started) {
            player.fd.d1 =player.fd.d1.add(this.resGain('1d').mul(diff))
            player.fd.d2 =player.fd.d2.add(this.resGain('2d').mul(diff))
            player.fd.d3 =player.fd.d3.add(this.resGain('3d').mul(diff))
            player.fd.d4 = player.fd.d4.add(this.resGain('4d').mul(diff))
        }
    }
}