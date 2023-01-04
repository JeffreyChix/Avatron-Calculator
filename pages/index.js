import { useState } from "react";
import Head from "next/head";
import useSound from "use-sound";
import localFont from "@next/font/local";

import styles from "../styles/Home.module.css";
import clickSound from "../assets/click-sound.mp3";

const operators = ["-", "+", "X", "÷"];
const trueOperators = {
  "-": "-",
  "+": "+",
  X: "*",
  "÷": "/",
};

const caculatorFont = localFont({ src: "../assets/fonts/Calculator.ttf" });

const Button = ({ className, text, onClick = () => {} }) => {
  return (
    <div className={`button ${className}`} onClick={onClick}>
      <div className="shading"></div>
      <div className="button-inner">
        <div
          className={`button-text ${
            !Number.isNaN(+text) || [...operators, "=", "."].includes(text)
              ? "button-text--number"
              : ""
          } ${operators.includes(text) ? "button-text--bold" : ""}`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [input, setInput] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const [error, setIsError] = useState(false);

  const [play] = useSound(clickSound);

  const canShow = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    ...operators,
  ];

  const injectTrueOperators = (input) => {
    const newInput = [];
    const sInput = input.toString().replaceAll(",", ""); // input must always be in string format with no commas
    for (let i = 0; i < sInput.length; i++) {
      let char = sInput[i];
      newInput.push(trueOperators[char] ?? char);
    }
    return newInput.join("");
  };

  const handleUserInput = (e) => {
    try {
      play();
      if (error) {
        setIsError(false);
        setInput("");
      }
      const text = e.target.innerText;
      const lastCharacter = input[input.length - 1]; // get the last character of the input

      if (!canShow.includes(text)) {
        switch (text) {
          case "C":
            setInput("");
            setIsEvaluated(false);
            break;
          case "=":
            const inputWithValidOperators = injectTrueOperators(input);
            if (lastCharacter === " ") break;
            const result = eval(inputWithValidOperators).toLocaleString(
              "en-US"
            );
            setInput(result);
            setIsEvaluated(true);
            break;
          default:
            break;
        }
        return;
      }

      if (isEvaluated && (!Number.isNaN(+text) || text === ".")) {
        setInput(text);
        setIsEvaluated(false);
        return;
      }

      setIsEvaluated(false);
      if (text === ".") setDotCount((prev) => prev + 1);

      if (lastCharacter === " " && operators.includes(text)) return; // only one operator at a time. Eg: 2 + + 3 is not allowed

      if (text === "." && dotCount >= 1) return;
      if (operators.includes(text)) setDotCount(0);

      const refactoredInput = operators.includes(text)
        ? " " + text + " "
        : text; // add space between operators

      setInput((prev) => prev + refactoredInput);
    } catch (err) {
      setInput("Bad expression!");
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Functional Calculator Avatron</title>
        <meta
          name="description"
          content="Functional Calculator Avatron implemented by Jeffrey Nwankwo"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="avatron">
          <div className="top-stripes-container">
            <div className="stripe"></div>
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>
          <div className={`result ${error && "result--error"} ${caculatorFont.className}`}>
            <div className="result--inner">{input}</div>
          </div>
          <div className="button-container">
            <div className="logo-container">
              <div className="logo">
                <span className="name">Avatron</span> <strong>903M</strong>
              </div>
            </div>
            <div className="button-container-top">
              <div className="button-top-row">
                <Button
                  text="C"
                  className="button--orange button-first"
                  onClick={handleUserInput}
                />
              </div>
            </div>
            <div className="button-container-bottom">
              <div className="button-row top-row">
                <Button
                  text="MC"
                  className="button--orange button-first"
                  onClick={handleUserInput}
                />
                <Button
                  text="M+"
                  className="button--orange button-second"
                  onClick={handleUserInput}
                />
                <Button
                  text="M-"
                  className="button--orange button-third"
                  onClick={handleUserInput}
                />
                <Button
                  text="MR"
                  className="button--orange button-fourth"
                  onClick={handleUserInput}
                />
              </div>
              <div className="button-row second-row">
                <Button
                  text="7"
                  className="button--gray button-first"
                  onClick={handleUserInput}
                />
                <Button
                  text="8"
                  className="button--gray button-second"
                  onClick={handleUserInput}
                />
                <Button
                  text="9"
                  className="button--gray button-third"
                  onClick={handleUserInput}
                />
                <Button
                  text="-"
                  className="button--white button-fourth"
                  onClick={handleUserInput}
                />
              </div>
              <div className="button-row third-row">
                <Button
                  text="4"
                  className="button--gray button-first"
                  onClick={handleUserInput}
                />
                <Button
                  text="5"
                  className="button--gray button-second"
                  onClick={handleUserInput}
                />
                <Button
                  text="6"
                  className="button--gray button-third"
                  onClick={handleUserInput}
                />
                <Button
                  text="÷"
                  className="button--white button-fourth"
                  onClick={handleUserInput}
                />
              </div>
              <div className="button-row fourth-row">
                <Button
                  text="1"
                  className="button--gray button-first"
                  onClick={handleUserInput}
                />
                <Button
                  text="2"
                  className="button--gray button-second"
                  onClick={handleUserInput}
                />
                <Button
                  text="3"
                  className="button--gray button-third"
                  onClick={handleUserInput}
                />
                <Button
                  text="X"
                  className="button--white button-fourth"
                  onClick={handleUserInput}
                />
              </div>
              <div className="button-row fifth-row">
                <Button
                  text="0"
                  className="button--gray button-first"
                  onClick={handleUserInput}
                />
                <Button
                  text="."
                  className="button--gray button-second"
                  onClick={handleUserInput}
                />
                <Button
                  text="="
                  className="button--white button-fourth"
                  onClick={handleUserInput}
                />
                <Button
                  text="+"
                  className="button--white button-fourth"
                  onClick={handleUserInput}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div>
          <h1>Avatron Calculator</h1>
        </div>
        <div>
          HTML & CSS designed by{" "}
          <a
            href="https://twitter.com/KassandraSanch?s=20"
            target="_blank"
            rel="noreferrer noopener"
          >
            @KassandraSanch
          </a>
        </div>
        <div>
          Made functional by{" "}
          <a
            href="https://twitter.com/JeffreySunny1"
            target="_blank"
            rel="noreferrer noopener"
          >
            @JeffreySunny1
          </a>{" "}
          (
          <a
            href="https://linkedin.com/in/jeffsalive"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          )
        </div>
      </footer>
    </div>
  );
}
