import { builtins } from '../../lib/vrd-lang/builtins'
import { VBuiltin, VError, VInteger, VNull, VString, VTypes, type VObject } from '../../lib/vrd-lang/object'
import { externalInfixHandlers, objConst } from '@/lib/vrd-lang/evaluator'
import { temp } from '../temp'
import formater from '@/lib/formater'
import PowiainaNum from 'powiaina_num.js'
import { player } from '../saves'
import { BaixieSystemReadfile, convertPath, createFile, FakeFileSystem, FSDirectory, FSDirectoryContent, FSFile, RootFS, splitPaths } from '../fakeshell/filesystem'
import { getReadlineString } from '../fakeshell/readline'
import { pwd } from '../fakeshell'
export class VBignum implements VObject {
  type(): VTypes {
    return VTypes.INTEGER_OBJECT
  }
  inspect(): string {
    return 'Bignum(' + formater(this.value) + ')'
  }
  value: PowiainaNum
  constructor(value: PowiainaNum) {
    this.value = value
  }
}

externalInfixHandlers.push({
  left: VBignum,
  right: VBignum,
  handler(op, left, right) {
    if (left instanceof VBignum) {
      if (right instanceof VBignum) {
        return new VBignum(left.value.add(right.value))
      }
    }
    return new VBignum(PowiainaNum.NaN)
  },
})
externalInfixHandlers.push({
  left: VBignum,
  right: VInteger,
  handler(op, left, right) {
    if (left instanceof VBignum) {
      if (right instanceof VInteger) {
        return new VBignum(left.value.add(right.value))
      }
    }
    return new VBignum(PowiainaNum.NaN)
  },
})
export function postInitVRDLang() {
  builtins.puts = new VBuiltin(async function (...args: VObject[]) {
    temp.automatorresult = temp.automatorresult + args.map((x) => x.inspect()).join(' ') + '\n'
    temp.baixieSystemConsole = temp.baixieSystemConsole + args.map((x) => x.inspect()).join(' ') + '\n'
    return objConst.NULL
  })
  builtins.readfile = new VBuiltin(async function (str: VObject) {
    if (str instanceof VString) {
      let file = await BaixieSystemReadfile(str.value);
      if (typeof file=='string') {
        return new VString(file);
      }
      if (file===null)
        return new VError("File not exists.");
      return new VError("Is a directory.")
    } 
    return new VError("Argument must be string.")
  })
  builtins.readline = new VBuiltin(async function (str: VObject) {
    let curstr = "";
    if (str instanceof VString) {
      curstr = str.value;
    }
    return new VString(await getReadlineString(curstr));
  })
  builtins.createFile = new VBuiltin(async function (str: VObject) {
    if (str instanceof VString) {
      let path = convertPath(str.value, "/"+pwd.value.join("/"));
      console.log(path);
      createFile(path.slice(0, path.length-1), path[path.length-1]);
      return objConst.NULL;
    } 
    return new VError("Argument must be string.")
  })
  builtins.writeFile = new VBuiltin(async function (str: VObject, content: VObject) {
    if (content instanceof VString) {
      if (str instanceof VString) {
        let path = convertPath(str.value, "/"+pwd.value.join("/"));
        console.log(path);
        let goalfile = await RootFS.access(path.slice(0, path.length));
        if (goalfile == null) {
          createFile(path.slice(0, path.length-1), path[path.length-1]);
        }
        let goalfiledirectory = await RootFS.access(path.slice(0, path.length-1)) as FSDirectory;
        let objectfile = (((await goalfiledirectory.content.content()) as FakeFileSystem[])
        .find((v)=>v.name==path[path.length-1]))
        if (objectfile) {
          console.log(objectfile)
          objectfile.write(content.value)
        }

        
        return objConst.NULL;
      } 
      return new VError("path must be string.")
    }
    return new VError("Write content must be string.")
  })
  builtins.envPoints = new VBuiltin(async function () {
    return new VBignum(player.points.clone())
  })
}
