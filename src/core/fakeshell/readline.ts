import { baixieConsole } from ".";
import { BaixieSystemReadfile } from "./filesystem";
export const highlight = (x: string)=>"<span style=\"background-color: white; color:black\">"+x+"</span>"
export async function getReadlineString(curstringbase: string="") {
    let curstring = curstringbase;
    let origConsole = baixieConsole.cons;
    let pos = curstringbase.length;
        baixieConsole.cons = origConsole + curstring+ highlight(" ")
    while(!(curstring.endsWith("\x04") || curstring.endsWith("\x0a"))) {
        let characters = await BaixieSystemReadfile("/dev/stdinfast") as string;
        console.log(characters);
        if (characters.length==1){
            curstring = curstring.substring(0,pos) + characters + curstring.substring(pos);
            pos++;
        }
        if (characters == "\x1b[C") {
            pos = Math.min(pos+1,curstring.length);
        }
        if (characters == "\x1b[D") {
            pos = Math.max(pos-1,0);
        }
        if (characters == "\x7f") {
            curstring = curstring.substring(0,pos-2)+curstring.substring(pos)
            pos = Math.max(pos-2,0);
        }
        if (characters == "\x04") {
            curstring = curstring.substring(0,pos-1)+curstring.substring(pos)+"\x04"
            pos = curstring.length+1;

        }
        if (curstring.endsWith("\x04") || curstring.endsWith("\x0a")) {
            baixieConsole.cons = origConsole+curstring.substring(0,curstring.length-1)+"\n"
            break;
        }
        baixieConsole.cons = origConsole+curstring.substring(0,pos) + highlight(" ") + curstring.substring(pos);
    }
    return curstring.substring(0,curstring.length-1);
}