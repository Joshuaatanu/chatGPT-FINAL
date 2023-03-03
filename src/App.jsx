import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

 

  const configuration = new Configuration({
    apiKey:import.meta.env.VITE_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const generateResponse = async () => {
    const res = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1084,
      top_p: 1,
      best_of: 8,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setResult(res.data.choices[0].text);
  };
  return (
    <div className="app-main">
      <h3>chatGPT</h3>
      <input
        placeholder="type something"
        onChange={(e) => setPrompt(e.target.value)}
      ></input>
      <button onClick={generateResponse}> submit</button>
      <h4> {result}</h4>
    </div>
  );
}

export default App;
