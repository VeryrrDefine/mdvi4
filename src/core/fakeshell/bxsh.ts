import { Lexer } from "@/lib/vrd-lang/lexer";
import { BaixieSystemClear, BaixieSystemOutput, pwd } from ".";
import { BaixieSystemPKG } from "./bx-package";
import { searchPATHandReturnContent } from "./environments";
import { BaixieSystemReadfile, FakeFileSystem, fixDots, FSDirectory, withPwd } from "./filesystem";
import { Parser } from "@/lib/vrd-lang/parser";
import { evalProgram, VEnvironment } from "@/lib/vrd-lang/evaluator";
import { VArray, VError, VString } from "@/lib/vrd-lang/object";
import { getReadlineString } from "./readline";

export async function BaixieSystemBXSH(){
    while (1) {
        try{            
            BaixieSystemOutput(`{/${pwd.value.join("/")}}$ `);

            let result = await getReadlineString();
            let run_command = result.split(" ");
            if (!run_command[0]){}
            else if (run_command[0] == "exit"){
                BaixieSystemOutput("exit\n");
                break;
            }
            else if (run_command[0] == "echo"){
                BaixieSystemOutput(run_command.slice(1).join(" "))
                BaixieSystemOutput("\n")
            } else if (run_command[0] == "help") {
                BaixieSystemOutput("There is no help.\n")
            } else if (run_command[0] == "su") {
                BaixieSystemOutput("You shouldn't get there.\n")
            } else if (run_command[0] == "cd") {
                let content = await BaixieSystemReadfile(run_command[1] ?? "");
                if (typeof content == "string") {
                    BaixieSystemOutput("Not a directory:" +run_command[1]+"\n");
                } else {
                    pwd.value = withPwd(run_command[1]);
                    fixDots(pwd.value);
                }
            } else if (run_command[0] == "reboot") {
                location.reload();
            } else if (run_command[0] == "shutdown") {
                BaixieSystemOutput("Unable to shutdown.\n")
                // location.replace("data:text/html;base64,"+btoa(`<a href=\"${location.href}\">Restart the game</a>`))
            } else if (run_command[0] == "id") {
                BaixieSystemOutput("uid=1011(player) gid=1011(player) groups=1011(player)\n")
            } else if (run_command[0] == "uname") {
                BaixieSystemOutput("Baixie baixie 0.0.0 ???, 00 ??? 0000 00:00:00 +0000 ?????? Baixie\n")
            } else {
                let content = await searchPATHandReturnContent(run_command[0]);
                if (!content) {
                    BaixieSystemOutput(`bxsh: command not found: ${run_command[0]}\n`)
                } else {
                    await BaixieSystemRunprocess(content, run_command);
                }
            }
        } catch (e) {
            console.log(e);
            BaixieSystemOutput(`Unable to complete operation: ${e}\n`)
        }
    }
}

export async function BaixieSystemRunprocess(fakecontent: string, run_command: string[]){
    if (fakecontent=="bxsh") {
        return await BaixieSystemBXSH();
    }
    else if (fakecontent=="clear") {
        return BaixieSystemClear();
    }
    else if (fakecontent=="ls") {
        let content = await BaixieSystemReadfile(run_command[1] ?? "");
        if (typeof content == "string") {
            BaixieSystemOutput("Not a directory:" +run_command[1]+"\n");
        }else if (content==null) {
            BaixieSystemOutput("Cannot find file: "+run_command[1])
        } else {
            let content2 = (await content.content?.content()) as FakeFileSystem[];
            BaixieSystemOutput(content2.map((v)=>v.name).join("\n"));
            BaixieSystemOutput("\n")
        }
    }
    else if (fakecontent=="cat") {
        let content = await BaixieSystemReadfile(run_command[1] ?? "");
        if (content instanceof FakeFileSystem) {
            BaixieSystemOutput("Not a file:" +run_command[1]+"\n");
        } else if (content==null) {
            BaixieSystemOutput("Cannot find file: "+run_command[1])
        }else {
            BaixieSystemOutput(content);
            BaixieSystemOutput("\n")
        }
    }else if (fakecontent=="rmdir") {
        let content = await BaixieSystemReadfile(run_command[1] ?? "");
        if (typeof content=="string") {
            BaixieSystemOutput("Not a directory:" +run_command[1]+"\n");
        } else {
            let path5 = withPwd(run_command[1])
            let goal2 = path5[path5.length-1];
            path5=path5.concat("..");
            fixDots(path5);
            let parentdirectory = await BaixieSystemReadfile("/"+path5.join("/")) as FSDirectory;
            let directories = ((await parentdirectory.content.content()) as FakeFileSystem[]).filter(
                (value)=> value.name!==goal2
            );
            parentdirectory.content.content = async ()=>directories
        }
    }else if (fakecontent=="rm") {
        let content = await BaixieSystemReadfile(run_command[1] ?? "");
        if (content instanceof FakeFileSystem) {
            BaixieSystemOutput("Not a file:" +run_command[1]+"\n");
        } else {
            let path5 = withPwd(run_command[1])
            let goal2 = path5[path5.length-1];
            path5=path5.concat("..");
            fixDots(path5);
            console.log(path5);
            let parentdirectory = await BaixieSystemReadfile("/"+path5.join("/")) as FSDirectory;
            let directories = ((await parentdirectory.content.content()) as FakeFileSystem[]).filter(
                (value)=> value.name!==goal2
            );
            parentdirectory.content.content = async ()=>directories
        }
    } else if (fakecontent=="chat") {
        return await new Promise<void>((res)=> {
            setTimeout(function (){
                BaixieSystemOutput("Unable to connect into network 10.0.0.2:8080, please try again.\n");
                res();
            },5000)
        })
    }else if (fakecontent == "bxp"){
        await BaixieSystemPKG(run_command);
    }else if (fakecontent.startsWith("VRD\n")) {
        let varenv = new VEnvironment();
        varenv.set("argv", new VArray(run_command.map((x)=>new VString(x))))
        let res = await evalProgram(
            new Parser(new Lexer(fakecontent.slice(4))).parseProgram().statements, 
                varenv
            );
        if (res instanceof VError) {
            BaixieSystemOutput("Process exited with error "+res.message);
        }
    }else{
        BaixieSystemOutput("Unable to run process "+run_command[0]+": exec format error\n")
    }
}