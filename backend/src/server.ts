import express from "express";
import cors from "cors";
import {exec} from "child_process";
import { rejects } from "assert";
import { stderr, stdin, stdout } from "process";

const app = express();
app.use(cors());
app.use(express.json());


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