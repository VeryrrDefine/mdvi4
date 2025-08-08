import { BaixieSystemClear, BaixieSystemOutput, pwd } from ".";
import { searchPATHandReturnContent } from "./environments";
import { BaixieSystemReadfile, FakeFileSystem, fixDots, FSDirectory, withPwd } from "./filesystem";

export async function BaixieSystemBXSH(){
    while (1) {
        try{
            BaixieSystemOutput(`[player@baixie /${pwd.value.join("/")}]$ `);
            let result = await BaixieSystemReadfile("/dev/stdin") as string;
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
        } else {
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
            let parentdirectory = await BaixieSystemReadfile("/"+path5) as FSDirectory;

            parentdirectory.content.content = async ()=>((await parentdirectory.content.content()) as FakeFileSystem[]).filter(
                (value)=> value.name!==goal2
            )
        }
    } else if (fakecontent=="chat") {
        return await new Promise<void>((res)=> {
            setTimeout(function (){
                BaixieSystemOutput("Unable to connect into network 10.0.0.2:8080, please try again.\n");
                res();
            },5000)
        })
    }else {
        BaixieSystemOutput("Unable to run process "+run_command[0]+": exec format error\n")
    }
}