import * as genai from "@google/genai";
console.log("Exports from @google/genai:", Object.keys(genai));
if ((genai as any).Modality) {
    console.log("Modality values:", (genai as any).Modality);
} else {
    console.log("Modality is NOT exported.");
}
const client = new genai.GoogleGenAI({ apiKey: "dummy" });
if (client.live) {
    console.log("client.live prototype properties:", Object.getOwnPropertyNames(Object.getPrototypeOf(client.live)));
}
