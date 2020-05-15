import { yaqrcode } from "./mod.ts";

console.log(`${Deno.args.join(" ")}:
${await yaqrcode(Deno.args.join(" "))}`);