import { BaixieSystemReadfile, FakeFileSystem, fixDots, withPwd } from "./filesystem";

export const environents: Map<string, string> = new Map();
environents.set("PATH", "/bin/")

export async function searchPATHandReturnContent(path: string) {
    let paths = path.split("/");
    if (path=="") paths = []

    fixDots(paths);
    if (path[0]==".") {
        let path5 = withPwd(path);
        fixDots(path5);
        let content = await BaixieSystemReadfile("/"+path5.join("/"));
        if (content instanceof FakeFileSystem) {
            return;
        } else {
            return content;
        }
    } 
    let envPaths = (environents.get("PATH") as string).split(":");
    for (const p of envPaths) {
        let path2 = p;
        let paths3 = path2.split("/");
        fixDots(paths3);
        if (path=="") paths3 = []
        paths3 = paths3.concat(paths);
        try {
            let content = await BaixieSystemReadfile("/"+paths3.join("/"));
            if (content instanceof FakeFileSystem) {
                continue
            } else {
                return content;
            }
        } catch {
            continue
        }

    }
}