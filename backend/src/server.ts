import express from "express";
import cors from "cors";
import {exec} from "child_process";
import { rejects } from "assert";
import { stderr, stdin, stdout } from "process";
const bodyParser = require("body-parser");
const { puter } = require("@heyputer/puter.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/api/OpenAI/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Incoming message:", message);
    const response = await puter.ai.chat(message, {
      model: "gpt-5.4-nano",
    });
    console.log("Raw AI response:", response); 

    const text =
      response?.message?.content ||
      response?.toString?.() ||
      "No response";

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error from AI" });
  }
});

function getResponse(prompt:string) : Promise<string>{
    return new Promise((resolve, reject)=>{
        const process = exec("ollama run llama3", (error, stdout, stderr)=>{
            if(error) reject(error);
            resolve(stdout);
        })

        process.stdin?.write(prompt);
        process.stdin?.end();
    });
}

app.post("/chat", async(req,res)=>{
    const {message} = req.body;
    try{
        const reply = await getResponse(message);
        res.json({reply});
    } catch (err){
        res.status(500).json({error:"Error Porcessing request"});
    }
});

app.listen(5000, ()=>{
    console.log("Server running on 5000");
})