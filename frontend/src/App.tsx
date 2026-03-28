// import logo from './logo.svg';
// import './App.css';
// import React, {useState} from 'react'

// function App() {
//   const [messages, setMessages] = useState<{role:string; text:string}[]>([]);
//   const [input, setInput] = useState("");
//   const sendMessage = async()=>{
//     if(!input) return;

//     const newMessages = [...messages, {role:"user", text:input}];
//     setMessages(newMessages);

//     const response = await fetch("http://localhost:5000/chat",{
//       method: "POST",
//       headers:{
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({message:input}),
//     });

//     const data = await response.json();

//     setMessages([...newMessages, {role:"bot", text:data.reply}]);
//     setInput("");
//   };

//   return (
//     <div style={{ width: "400px", margin: "50px auto" }}>
//       <h2>Chatbot</h2>

//       <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.text}
//           </p>
//         ))}
//       </div>

//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         style={{ width: "70%" }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AiChat from "./pages/AiChat";
import AIOllamaChat from "./pages/AIOllamaChat";

function App() {
  return (
    <Router>
      {/* Simple navbar */}
      <nav style={styles.menu}>
        <Link to="/" style={{ marginRight: 20 }}>Home</Link>
        <Link to="/ai-chat" style={{marginRight:20}}>AI Chat</Link>
        <Link to="/ai-ollama-chat">AI Ollama Chat</Link>
      </nav>

      <Routes>
        <Route path="/"/>
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/ai-ollama-chat" element={<AIOllamaChat />} />
      </Routes>
    </Router>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
   menu: {
      fontSize: "26px",
      padding: "10px 20px",
      borderBottom: "6px solid #ccc"
   }

  }

export default App;