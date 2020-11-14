import { useContext } from "react";
import Head from "next/head";
import styled from "styled-components";
import Button from "../components/Button";
import ListNote from "../components/ListNote";
import Editor from "../components/Editor";
import MainContext from "../contexts/MainContext";
import { EditorContextProvider } from "../contexts/EditorContext";
import Header from "../components/Header";

const Home = ({ className }) => {
  return (
    <div className={className}>
      <EditorContextProvider>
        <Head>
          <title>LockNote</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main>
          <ListNote />
          <Editor />
        </main>
      </EditorContextProvider>
    </div>
  );
};

export default styled(Home)`
  height: 100%;

  display: flex;
  flex-direction: column;

  header,
  main {
    padding: 0.2rem;
    display: flex;
    width: inherit;
  }

  main {
    flex: 1;

    display: flex;

    ${ListNote},${Editor} {
      flex: 1;
    }

    ${ListNote} {
      max-width: 20em;
    }
  }
`;
