// @deno-types="./_qrcode.d.ts"
import { qrcode as _qrcode } from "./qrcode.js";

export async function qrcode(
  text: string,
  options?: Options,
): Promise<_QRCode> {
  options = options || {};
  const typeNumber: TypeNumber = options.typeNumber || 4;
  const errorCorrectLevel: ErrorCorrectionLevel = options.errorCorrectLevel ||
    "M";
  const size: number = options.size || 500;

  let qr;

  try {
    qr = _qrcode(typeNumber, errorCorrectLevel || "M");
    qr.addData(text);
    qr.make();
  } catch (e) {
    if (typeNumber >= 40) {
      throw new Error("Text too long to encode");
    } else {
      return qrcode(text, {
        size: size,
        errorCorrectLevel: errorCorrectLevel,
        typeNumber: (typeNumber + 1 as TypeNumber),
      });
    }
  }

  const cellsize = Math.floor(size / qr.getModuleCount());
  const margin = Math.floor((size - qr.getModuleCount() * cellsize) / 2);

  return qr.createDataURL(cellsize, margin, size);
}
