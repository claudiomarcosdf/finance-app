import React from 'react';
import Typograpy from '@material-ui/core/Typography';

import '../App.css';

export default function Home() {
  return (
    <>
      <div className="home">
        <div>
          <div>
            <Typograpy variant="h2">Bem vindo!</Typograpy>
          </div>
          <div>
            <Typograpy variant="h2">Faça seu dinheiro render.</Typograpy>
          </div>
        </div>
      </div>
    </>
  );
}
