// @deno-types="./qrcode.d.ts"
import { qrcode } from "./qrcode.js";
export async function yaqrcode (text:string, options?:Options):Promise<QRCode> {
    options = options || {};
    const typeNumber: TypeNumber = options.typeNumber || 4;
    const errorCorrectLevel: ErrorCorrectionLevel = options.errorCorrectLevel || 'M';
    const size:number = options.size || 500;

    let qr;

    try {
        qr = qrcode(typeNumber, errorCorrectLevel || 'M');
        qr.addData(text);
        qr.make();
    } catch (e) {
        if(typeNumber >= 40) {
            throw new Error('Text too long to encode');
        } else {
            return yaqrcode(text, {
                size: size,
                errorCorrectLevel: errorCorrectLevel,
                typeNumber: (typeNumber + 1 as TypeNumber)
            });
        }
    }

    // calc cellsize and margin
    const cellsize = Math.floor(size / qr.getModuleCount());
    const margin = Math.floor((size - qr.getModuleCount() * cellsize) / 2);

    return qr.createDataURL(cellsize, margin, size);
};