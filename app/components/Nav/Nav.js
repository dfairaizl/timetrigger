import React from 'react';

import './Nav.scss';

import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const Nav = () => (
  <TopAppBar className='nav'>
    <TopAppBarRow>
      <TopAppBarSection align='start'>
        <TopAppBarIcon navIcon tabIndex={0}>
          <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')} />
        </TopAppBarIcon>
        <TopAppBarTitle>Timetrigger</TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection align='end' role='toolbar'>
        <TopAppBarIcon actionItem tabIndex={0}>
          <MaterialIcon
            aria-label='print page'
            hasRipple
            icon='print'
            onClick={() => console.log('print')}
          />
        </TopAppBarIcon>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
);

export default Nav;
