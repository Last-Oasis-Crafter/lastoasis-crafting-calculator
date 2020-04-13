import React from 'react';
import * as Semantic from 'semantic-ui-react'

import './App.css';
import ItemSidebar from './ItemSidebar'

function App() {
  return (
    <React.Fragment>
      <ItemSidebar>
        <Semantic.Container>
          <Semantic.Placeholder>
            <Semantic.PlaceholderParagraph>
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
            </Semantic.PlaceholderParagraph>
            <Semantic.PlaceholderParagraph>
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
              <Semantic.Placeholder.Line />
            </Semantic.PlaceholderParagraph>
          </Semantic.Placeholder>
        </Semantic.Container>
      </ItemSidebar>
    </React.Fragment>
  );
}

export default App;
