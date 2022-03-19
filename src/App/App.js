import React from 'react';
import { GenerateMeme } from '../GenerateMeme/GenerateMeme';
import { Switch, Route } from 'react-router-dom';
import { MemeGenerated } from '../MemeGenerated/MemeGenerated';

export const App = () => {
  return (
    <div>
      <h1>Memes Generator</h1>
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
