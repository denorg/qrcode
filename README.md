# 📇 QR Code

Generate QR codes in Deno, as base64-encoded images, completely dependency-free and requires no binary.

This is a port of [zenozeng/node-yaqrcode](https://github.com/zenozeng/node-yaqrcode), which itself is a port of the QR code generator in the d-project.

[![Deno CI](https://github.com/denorg/qrcode/workflows/Deno%20CI/badge.svg)](https://github.com/denorg/qrcode/actions)
[![GitHub](https://img.shields.io/github/license/denorg/qrcode)](https://github.com/denorg/qrcode/blob/master/LICENSE)
[![Contributors](https://img.shields.io/github/contributors/denorg/qrcode)](https://github.com/denorg/qrcode/graphs/contributors)
[![Deno Starter](https://img.shields.io/badge/deno-starter-brightgreen)](https://denorg.github.io/starter/)
[![Made by Denorg](https://img.shields.io/badge/made%20by-denorg-0082fb)](https://github.com/denorg)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/denorg/qrcode)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## ⭐ Getting started

```ts
import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
const base64Image = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER"); // data:image/gif;base64,...
```

![QR code](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/240px-QR_code_for_mobile_English_Wikipedia.svg.png)

You can also add a custom size by specifying `size` in the second parameter:

```ts
const fixedSizeImage = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER", { size: 500 });
```
### CLI with [DPX](https://github.com/denorg/dpx)

After [installing DPX](https://github.com/denorg/dpx), you can directly use the CLI using the `dpx` command:

```bash
dpx qrcode <text>
```

### CLI

Alternatively, you can use it directly from the CLI by using `deno run`:

```bash
deno run https://deno.land/x/qrcode/cli.ts <text>
```

You can also install it globally using the following:

```bash
deno install qrcode https://deno.land/x/qrcode/cli.ts
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

## ⭐ Related Work

- [zenozeng/node-yaqrcode](https://github.com/zenozeng/node-yaqrcode) is the Node.js project that is the origin of this implementation


## 📄 License

- MIT © [Denorg](https://den.org.in)
- Original repo: MIT © [Zeno Zeng](https://github.com/zenozeng/node-yaqrcode)
- "QR Code" is registered trademark of [Denso Wave](http://www.denso-wave.com/qrcode/faqpatent-e.html)

<p align="center">
  <a href="https://den.org.in">
    <img width="100" alt="" src="https://raw.githubusercontent.com/denorg/denorg/master/logo.svg">
  </a>
</p>
<p align="center">
  <sub>A project by <a href="https://den.org.in">Denorg</a>, the world's first Deno-focused community<br>organization and consulting company. <a href="https://den.org.in">Work with us →</a></sub>
</p>
