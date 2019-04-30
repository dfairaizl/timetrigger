import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import MenuSurface, { Corner } from '@material/react-menu-surface';
import List, { ListItem, ListItemText } from '@material/react-list';
import { useAuthContext } from '../../context/auth-context';
import { signOut } from '../../services/auth';
import './Nav.scss';

import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const Nav = ({ history }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [menuOpen, updateMenu] = useState(false);

  const { user } = useAuthContext();

  const handleMenuAction = (index) => {
    if (index === 0) {
      history.push('/targets');
    } else if (index === 1) {
      signOut();
    }
  };

  return (
    <TopAppBar className='nav'>
      <TopAppBarRow>
        <TopAppBarSection align='start'>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')} />
          </TopAppBarIcon>
          <TopAppBarTitle>Timetrigger</TopAppBarTitle>
        </TopAppBarSection>
        <TopAppBarSection align='end'>
          <span>{user.email}</span>
          <TopAppBarIcon navIcon tabIndex={0}>
            <MaterialIcon hasRipple icon='account_circle' onClick={() => updateMenu(!menuOpen)} />
          </TopAppBarIcon>
          <div className='mdc-menu-surface--anchor' ref={(el) => setAnchorElement(el)}>
            <MenuSurface
              open={menuOpen}
              anchorCorner={Corner.TOP_LEFT}
              anchorMargin={{ top: 25 }}
              onClose={() => updateMenu(false)}
              anchorElement={anchorElement}
            >
              <List
                singleSelection
                handleSelect={handleMenuAction}
              >
                <ListItem>
                  <ListItemText primaryText='Trigger Targets' />
                </ListItem>
                <ListItem>
                  <ListItemText primaryText='Sign Out' />
                </ListItem>
              </List>
            </MenuSurface>
          </div>
        </TopAppBarSection>

      </TopAppBarRow>
    </TopAppBar>
  );
};

export default withRouter(Nav);
