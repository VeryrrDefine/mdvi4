import { ref, watch } from "vue";
import { BaixieSystemOutput, pwd } from ".";

export function BaixieSystemReadfile(path: string): Promise<string|FakeFileSystem> {

    return (async function(){
        let paths = withPwd(path);
        return RootFS.access(paths);
        throw Error("Not Implemented")
    })();
}
export function withPwd(path: string) {
    let paths = path.split("/");
    if (path=="") paths = []
    if (!path.startsWith("/")) {
        paths = pwd.value.concat(paths);
    }
    return paths;
}
export const devstdinContent = ref("");

export class FSContent{
    async content () :Promise<string|(FakeFileSystem[])|null> {
        return new Promise((r)=>r(null));
    }
    async write(content: string) {
        throw new Error("Unable to write");
    }
    async append(FS: FakeFileSystem) {
        throw new Error("Unable to append");
    }
}

export function fixDots(path2: string[]) {
    for (let i = 0; i<path2.length; i++) {
        if (path2[i]==".") {
            path2.splice(i, 1);
            i--;
        }
        if (path2[i]==".." && i>=1) {
            path2.splice(i-1, 2);
            i--; i--;
        }
        if (path2[i]==".." && i==0) {
            path2.splice(i, 1);
            i--;
        }
        if (/^\s*$/.test(path2[i])) {
            path2.splice(i, 1);
            i--;
        }
    }
}

export class FakeFileSystem {
    content: FSContent|null = null;
    name: string="";
    async access(path: string[]): Promise<string | FakeFileSystem> {

        let path2 = path;
        fixDots(path2);
        
        if (!this.content) throw Error("No content");
        let awa_contet = await this.content.content()
        if (!awa_contet) throw Error("No content");
        if (typeof awa_contet === "string" && path2.length>0) throw Error("Not a directory");
        if (typeof awa_contet === "string") return awa_contet;
        if (typeof awa_contet === "object") {
            if (path2.length > 0) {
                const res = awa_contet.find(function(fs){
                    if (fs.name == path2[0]) return fs;
                })
                if (!res) throw Error("Cannot find object path");
                if (path2.length>1) return res.access(path2.slice(1));
                else return res.access([]);
            }
        }
         return this;
    };
    async write(content: string) {
        throw Error("Unable to write")
    }
    async append(FS: FakeFileSystem) {
        throw Error("Unable to append")
    }
}

export class FSDirectory extends FakeFileSystem{
    name: string="";
    content: FSContent;
    constructor(content: FakeFileSystem[], name: string) {
        super()
        this.name = name;
        this.content = new FSContent();
        this.content.content = async()=>content;
    }

}

export class FSSimpleFileContent extends FSContent {
    realContent: string = "";
    async content(): Promise<string> {
        return this.realContent
    }
    async write(content:string) {
        this.realContent = content;
    }
    async append(FS: FakeFileSystem) {
        throw new Error("Not a directory")
    }
}

export class FSFile extends FakeFileSystem{
    content: FSSimpleFileContent;
    name: string="";
    constructor(content: string, name: string) {
        super()
        this.name = name;
        this.content = new FSSimpleFileContent();
        this.content.realContent = content;

    }
}
export class FSFileDelayed extends FSFile{
    constructor(content: string, name: string, delay=1000) {
        super(content, name);
        this.content.content = function () {
            return new Promise((res) => {
                setTimeout(function () {
                    res(content);
                },delay)
            })
        }
    }
}
export const RootFS = new FSDirectory([
    new FSDirectory([
        new FSFileDelayed("\u1064\u1963\u1752AAAAAAAA", "corrupted_file"),
        new class extends FSFile {
            constructor(content: string, name: string, delay=1000) {
                super(content, name);
                this.content.content = function () {
                    return new Promise((resolve) => {
                        const watchHandler = watch(()=>devstdinContent.value, function (newe, old) {
                            console.log(newe, newe.endsWith("\x04"))
                            if (newe.endsWith("\x04")) {
                                resolve(newe.substring(0, newe.length-1));
                                BaixieSystemOutput(newe.substring(0, newe.length-1));
                                BaixieSystemOutput("\n");
                                devstdinContent.value = "";
                                watchHandler.stop();
                            }
                        })
                    })
                }
            }
        }("","stdin")
    ],"dev"),
    new FSDirectory([
        new FSFile("bxsh", "bxsh"),
        new FSFile("clear", "clear"),
        new FSFile("ls", "ls"),
        new FSFile("cat", "cat"),
        new FSFile("rmdir", "rmdir"),
        new FSFile("chat", "chat"),
    ],"bin"),
    new FSDirectory([],"root"),
    new FSDirectory([
        new FSFile(
            "Welcome, Managers!\nWarning: This system is readonly.\n",
            "motd"
        ),
        new FSFile(
            "player:114514",
            "fakepasswd"
        ),
    ],"etc"),
    new FSDirectory([
        new FSDirectory([
            new FSFile(
                "hello, if you see this text, I'm leaved.\n            --- Hyperwinter which 7 years old",
                "hello.txt"
            )
        ],"player"),
    ],"home"),
],"")
console.log(RootFS.access(["home", "player", "hello.txt"]));