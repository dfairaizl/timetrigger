import React from 'react';
import ReactDOM from 'react-dom';

import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

import './index.scss';

const App = () => (
  <div>
    <TopAppBar
      title='Timetrigger'
      navigationIcon={<MaterialIcon
        icon='menu'
        onClick={() => console.log('click')}
      />}
      actionItems={[<MaterialIcon key='item' icon='bookmark' />]}
    />
    <TopAppBarFixedAdjust>
      My exciting content!
    </TopAppBarFixedAdjust>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
