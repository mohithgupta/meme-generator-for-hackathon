import React from 'react';
import { GenerateMeme } from '../GenerateMeme/GenerateMeme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import styles from "./styles.module.css";
import github from "../assets/github.png";

export const App = () => {
  return (
    <div>
      
      <h1>Memes Generator</h1>
      
      <div className={styles.github_link}>
        
        <a href="https://github.com/mohithgupta/meme-generator-for-hackathon" target='_blank' rel="noopener noreferer">
        
          <img src={github} alt="github logo"/>
       
        </a>
      
      </div>
      
      <Switch>
      
        <Route exact path='/'>
      
          <GenerateMeme />
      
        </Route>
      
        <Route path='/generated'>
      
          <MemeGenerated />
      
        </Route>
      
      </Switch>
    
    </div>
  );
}
