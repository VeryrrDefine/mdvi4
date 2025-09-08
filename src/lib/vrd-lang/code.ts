export class Instructions extends Uint8Array {
    constructor(length: number) {
        super(length);
    }
}
export enum OpCodes {
    OpConstant=0
}

class Definition {
    name: string;
    operandWidths: number[];
    constructor(name: string, operandWidths:number[]=[]) {
        this.name = name;
        this.operandWidths = operandWidths
    }
}

const definitions: Record<OpCodes, Definition> = {
    [OpCodes.OpConstant]: new Definition("OpConstant", [2]),
}

function lookup(op: OpCodes) {
    const def = definitions[op];
    return def;
}

function make(op: OpCodes, ...operands: number[]) {
    const def = lookup(op);

    let instructionLen = 1;
    for (let w of def.operandWidths) {
        instructionLen += w
    }

    let instruction = new Instructions(instructionLen).fill(0);
    instruction[0] = op;

    let offset = 1
    for (let i = 0; i< operands.length; i++) {
        let o =operands[i]
        let width = def.operandWidths[i];
        switch(width) {
            case 2:
                let view = new DataView(new ArrayBuffer(2))
                view.setUint16(0, o, false);
                for (let j=0;j<2;j++) {
                    instruction[offset + j] = view.getUint8(j);
                }
                break;
        }
    }
    return instruction;
}

console.log(make(OpCodes.OpConstant, 114514))