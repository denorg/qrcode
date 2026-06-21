import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.224.0/testing/asserts.ts";
import { handleRequest } from "./server.ts";

Deno.test("server example returns a GIF response", async (): Promise<void> => {
  const response = await handleRequest(
    new Request("http://localhost/?d=Hello%20World%21&v=5&e=L&s=250"),
  );
  const bytes = new Uint8Array(await response.arrayBuffer());

  assertEquals(response.status, 200);
  assertEquals(response.headers.get("content-type"), "image/gif");
  assertEquals(new TextDecoder().decode(bytes.slice(0, 6)), "GIF87a");
  assert(bytes.byteLength > 0);
});

Deno.test("server example handles HEAD without a body", async (): Promise<void> => {
  const response = await handleRequest(
    new Request("http://localhost/?data=Hello", { method: "HEAD" }),
  );

  assertEquals(response.status, 200);
  assertEquals(response.headers.get("content-type"), "image/gif");
  assertEquals((await response.arrayBuffer()).byteLength, 0);
});

Deno.test("server example falls back when optional query params are missing or blank", async (): Promise<void> => {
  const [defaults, explicitFallbacks] = await Promise.all([
    handleRequest(new Request("http://localhost/?data=Hello&s=&v=&e=bad")),
    handleRequest(
      new Request(
        "http://localhost/?data=Hello&size=250&typeNumber=4&errorCorrection=M",
      ),
    ),
  ]);

  assertEquals(defaults.status, 200);
  assertEquals(
    new Uint8Array(await defaults.arrayBuffer()),
    new Uint8Array(await explicitFallbacks.arrayBuffer()),
  );
});

Deno.test("server example rejects unsupported methods", async (): Promise<void> => {
  const response = await handleRequest(
    new Request("http://localhost/", { method: "POST" }),
  );

  assertEquals(response.status, 405);
  assertEquals(response.headers.get("allow"), "GET, HEAD, OPTIONS");
});
