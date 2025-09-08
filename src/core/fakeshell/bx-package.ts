import { BaixieSystemOutput } from ".";
import { FSDirectory, FSFile, RootFS } from "./filesystem";

export async function BaixieSystemPKG(run_command: string[]) {
    BaixieSystemOutput(`
BXP version 4.1.0

Usage:

    -i [packages]      Install packages
    -r [packages]      Remove packages

`)
    let installing = false;
    let removing = false;
    let packages = [];
    for (let i = 1; i<run_command.length; i++) {
        if (run_command[i].startsWith("-")) {
            if (run_command[i].includes("i")) {
                installing=true;
            }
            if (run_command[i].includes("r")) {
                removing=true;
            }
            
        } else {
            packages.push(run_command[i])
        }
        if (installing && removing) {
            BaixieSystemOutput("<span class='red'>Unable to install and removing.</span>")
            return;
        }
        
    }
    if (installing) {
        for (let i = 0; i<packages.length; i++) {
            BaixieSystemOutput(`Installing package ${packages[i]};`)
            await BaixieSystemPKGInstall(packages[i]);
        }
    }
    
    BaixieSystemOutput(`Process finished.`)
}

export async function BaixieSystemPKGInstall(package_name: string){
    let a = await RootFS.access(["usr", "bin"])
    if (a instanceof FSDirectory) {
        a.append(new FSFile(package_name, package_name));
    }
}