import React from 'react';
import Button from '@material/react-button';
import Card, {
  CardActions,
  CardActionButtons
} from '@material/react-card';
import {
  Headline5
} from '@material/react-typography';

import './TargetCard.scss';

export default function (props) {
  return (
    <Card className='TargetCard'>
      <Headline5>Target Name</Headline5>
      <ul>
        <li>Endpoint: <em>http://localhost:8080/echo</em></li>
        <li>Verification: <em>DNS TXT</em></li>
      </ul>
      <CardActions className='TargetCard--card-actions'>
        <CardActionButtons>
          <Button
            dense
            onClick={(ref) => console.log('edit target')}
          >
            Edit
          </Button>
          <Button
            dense
            outlined
            onClick={(ref) => console.log('edit target')}
          >
            Delete
          </Button>
        </CardActionButtons>
      </CardActions>
    </Card>
  );
}
