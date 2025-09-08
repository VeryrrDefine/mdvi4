import { diff } from "./game-loops";
import { player } from "./saves";

export function volumePLoop() {
    if (!(player.plot.fake_hard_resets>=5)) return;
    player.volumePoints = player.volumePoints.add(volumePGain().mul(diff)).min(5000)
}

export function volumePGain() {
    return player.points.div("1e250").root(10);
}