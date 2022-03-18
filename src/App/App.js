import React from 'react';
import { GenerateMeme } from '../GenerateMeme/GenerateMeme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';
import styles from "./styles.module.css"

export const App = () => {
  return (
    <div>
      <h1 className={styles.heading}>Memes Generator</h1>
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
