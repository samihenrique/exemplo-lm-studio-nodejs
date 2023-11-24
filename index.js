const OpenAI = require("openai");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const lmstudio = new OpenAI({
  baseURL: "http://192.168.68.102:1234/v1",
  apiKey: "NULL",
});

const arquivo = readFileSync(join(__dirname, "arquivo.js"), "utf8");

async function main() {
  const stream = await lmstudio.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `O comando em javascript abaixo, não está funcionando, por que? \n ${arquivo}`,
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();
