import { ref, watch } from "vue";
import { BaixieSystemOutput, pwd } from ".";

export function BaixieSystemReadfile(path: string): Promise<string|FakeFileSystem|null> {
    return (async function(){
        let paths = withPwd(path);
        return RootFS.access(paths);
    })();
}
export function withPwd(path: string, pwd2=pwd.value) {
    let paths = splitPaths(path)
    if (path=="") paths = []
    if (!path.startsWith("/")) {
        paths = pwd2.concat(paths);
    }
    return paths;
}
export const devstdinContent = ref("");

export class FSContent{
    async content () :Promise<string|(FakeFileSystem[])|null> {
        return new Promise((r)=>r(null));
    }
    async write(content: any) {
        throw new Error("Unable to write");
    }
    async append(FS: FakeFileSystem) {
        throw new Error("Unable to append");
    }
}

export class FSFileContent extends FSContent {
    realContent: string;
    async content () :Promise<string> {
        return new Promise((r)=>r(this.realContent));
    }
    async write(content: string) {
        this.realContent = content
    }
    async append(FS: FakeFileSystem) {
        throw new Error("Unable to append");
    }
    constructor(cont: string){
        super()
        this.realContent = cont;
    }
}

export class FSDirectoryContent extends FSContent {
    realContent: FakeFileSystem[];
    async content () :Promise<FakeFileSystem[]> {
        return new Promise((r)=>r(this.realContent));
    }
    async write(content: FakeFileSystem[]) {
        this.realContent = content
    }
    async append(FS: FakeFileSystem) {
        throw new Error("Unable to append");
    }
    constructor(cont: FakeFileSystem[]){
        super()
        this.realContent = cont;
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
    async access(path: string[]): Promise<string | FakeFileSystem | null> {

        let path2 = path;
        fixDots(path2);
        
        if (!this.content) throw Error("No content");
        let awa_contet = await this.content.content()
        if (awa_contet===null) throw Error("No content");
        if (typeof awa_contet === "string" && path2.length>0) throw Error("Not a directory");
        if (typeof awa_contet === "string") return awa_contet;
        if (typeof awa_contet === "object") {
            if (path2.length > 0) {
                const res = awa_contet.find(function(fs){
                    if (fs.name == path2[0]) return fs;
                })
                if (!res) return null;
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
    async append(FS: FakeFileSystem): Promise<void> {
        let cont = await this.content.content() as FakeFileSystem[];
        cont.push(FS);
    }
}


export class FSFile extends FakeFileSystem{
    content: FSFileContent;
    name: string="";
    constructor(content: string, name: string) {
        super()
        this.name = name;
        this.content = new FSFileContent(content);
    }
    async write(content: string) {
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
            content: FSFileContent
            constructor(content: string, name: string, delay=1000) {
                super(content, name);
                this.content = new FSFileContent("");
                this.content.content = function () {
                    return new Promise((resolve) => {
                        const watchHandler = watch(()=>devstdinContent.value, function (newe, old) {
                            //console.log(newe, newe.endsWith("\x04"))
                            if (newe.endsWith("\x04")) {
                                resolve(newe.substring(0, newe.length-1));
                                // BaixieSystemOutput(newe.substring(0, newe.length-1));
                                // BaixieSystemOutput("\n");
                                devstdinContent.value = "";
                                watchHandler.stop();
                            }
                        })
                    })
                }
            }
        }("","stdin"),
        new class extends FSFile {
            constructor(content: string, name: string, delay=1000) {
                super(content, name);
                this.content.content = function () {
                    return new Promise((resolve) => {
                        const watchHandler = watch(()=>devstdinContent.value, function (newe, old) {
                            resolve(newe);
                            // BaixieSystemOutput(newe);
                            // BaixieSystemOutput("\n");
                            devstdinContent.value = "";
                            watchHandler.stop();
                        })
                    })
                }
            }
        }("","stdinfast"),
        new class extends FSFile {
            constructor(content: string, name: string, delay=1000) {
                super(content, name);
                this.content.content = async function () {
                    let content = await RootFS.access(["dev","stdin"]) as string;
                    BaixieSystemOutput(content);
                    BaixieSystemOutput("\n");

                    return content;
                }
            }
        }("","stdinc"),
        new class extends FSFile {
            constructor(content: string, name: string, delay=1000) {
                super(content, name);
                this.content.content = async function () {
                    let content = await RootFS.access(["dev","stdinfast"]) as string;
                    BaixieSystemOutput(content);
                    BaixieSystemOutput("\n");

                    return content;
                }
            }
        }("","stdinfastc"),
        new FSFile((function(){
            let res = "";
            for (let i = 0; i<0x100; i++) {
                res+=String.fromCharCode(i);
            }
            return res;
        })(),"ascii"),
        new FSFile("<img style=\"height: 1em; vertical-align: middle;\" src=\"baixie.png\" />","baixie"),
    ],"dev"),
    new class extends FSDirectory{
        constructor(name: string) {
            super([], name)
            this.content.content=async function (){
                let content = await RootFS.access(["usr","bin"])
                if (content===null) throw new Error("No content")
                
                return await (content as FSDirectory).content.content();
            }
        }
        
        async append(fs: FSFile) {
            let c = await RootFS.access(["usr","bin"]) as FSDirectory;
            c.append(fs);

        }
    }("bin"),
    new FSDirectory([

    ],"root"),
    new FSDirectory([
        new FSDirectory([
            new FSFile("bxsh", "bxsh"),
            new FSFile("clear", "clear"),
            new FSFile("ls", "ls"),
            new FSFile("cat", "cat"),
            new FSFile("rmdir", "rmdir"),
            new FSFile("chat", "chat"),
            new FSFile("rm", "rm"),
            new FSFile("bxp", "bxp"),
            new FSFile(`VRD
puts("Not Implemented");
puts(argv);
puts("Enter the file path");
let path = readline();
puts(path);
writeFile(path, readline(readfile(path)))

puts("拜谢");
`
            , "edit"),
            new FSFile(`VRD
puts("The file you want to create:");
let filename = readline();
createFile(filename);
// puts("The file's content");
// let content = readfile("/dev/stdinc");

puts("Bad system call");
puts("Unable to create file")

`
            , "mkfile"),
            new FSFile(`VRD
puts(拜谢)
`
            , "builtins")
        ], "bin"),
    ],"usr"),
    new FSDirectory([
        new FSFile(
            "Welcome, Managers!\nWarning: This system is readonly.\n",
            "motd"
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
export async function createFile(directory: string[], name: string) {
    let a = await RootFS.access(directory)
    if (a instanceof FSDirectory) {
        a.append(new FSFile("", name));
        return;
    }
    throw new Error("The parent directory is a file.");    
}


/**
 * Convert relative paths to absolute path.
 * @param path 
 */
export function convertPath(path: string, pwd:string): string[] {
    let pwd2 = splitPaths(pwd);
    return withPwd(path,pwd2)
}

export function splitPaths(path: string): string[] {
    return path.split("/")
}