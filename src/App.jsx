import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import OptionSelection from "./components/OptionSelection";
import Translation from "./components/Translation";
import { arrayItems } from "./AIOptions";

function App() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [result,setResult]= useState("");
  const [input, setInput] = useState("");

  const selectOption = (option) => {
    setOption(option);
  };

  const doStuff = async () => {
    let object = { ...option, prompt: input };
    // console.log(object);
    const response = await openai.createCompletion(object);
    setResult(response.data.choices[0].text)
  };
  console.log(option);

  // const generateResponse = async () => {
  //   const res = await openai.createCompletion({});
  //   setResult(res.data.choices[0].text);
  // };
  return (
    <>
      {Object.values(option).length === 0 ? (
        <OptionSelection arrayItems={arrayItems} selectOption={selectOption} />
      ) : (
        <Translation doStuff={doStuff} setInput={setInput} result={result}/>
      )}
    </>
  );
}

export default App;
