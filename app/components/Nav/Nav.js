import React from 'react';
import { useAuthContext } from '../../context/auth-context';
import './Nav.scss';

import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const Nav = () => {
  const { user } = useAuthContext();
  debugger;

  return (
    <TopAppBar className='nav'>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')} />
          </TopAppBarIcon>
          <TopAppBarTitle>Timetrigger</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end' role='toolbar'>
          <div>{user.email}</div>
        </TopAppBarSection>
      </TopAppBarRow>
    </TopAppBar>
  );
};

export default Nav;
