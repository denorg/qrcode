# 📇 QR Code

Generate QR codes in Deno, as base64-encoded images, completely dependency-free and requires no binary.

This is a port of [zenozeng/node-yaqrcode](https://github.com/zenozeng/node-yaqrcode), which itself is a port of the QR code generator in the d-project.

[![Test CI](https://github.com/denorg/qrcode/workflows/Test%20CI/badge.svg)](https://github.com/denorg/qrcode/actions)

```ts
import { yaqrcode } from "https://raw.githubusercontent.com/denorg/qrcode/master/mod.ts";
const base64Image = yaqrcode("Hello, world!");
```

You can also add a custom size by specifying `size` in the second parameter:

```ts
const fixedSizeImage = yaqrcode("Hello, world!", { size: 500 });
```

Alternatively, you can use it directly from the CLI:

```bash
deno run https://raw.githubusercontent.com/denorg/qrcode/master/cli.ts <text>
```

You can also install it globally using the following:

```bash
deno install qrcode https://raw.githubusercontent.com/oplik0/deno-yaqrcode/master/cli.ts
```

Then, the package is available to run:

```bash
qrcode <text>
```

## 👩‍💻 Development

Run tests:

```bash
deno test
```

### Notes

- To support typeNumber 40, use the `RS_BLOCK_TABLE` from [davidshimjs/qrcodejs](http://davidshimjs.github.io/qrcodejs/)
- To support UTF-8, use the code from [davidshimjs/qrcodejs](http://davidshimjs.github.io/qrcodejs/)
- Returns a base64-encoded image URL

## 📄 License

- MIT © [Denorg](https://den.org.in)
- Original repo: MIT © [Zeno Zeng](https://github.com/zenozeng/node-yaqrcode)
- "QR Code" is registered trademark of [Denso Wave](http://www.denso-wave.com/qrcode/faqpatent-e.html)
