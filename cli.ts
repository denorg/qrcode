import { qrcode } from "./mod.ts";

if (import.meta.main) {
  for (let arg of Deno.args) {
    console.log(`
${arg}:
${await qrcode(arg)}`);
  }
}
