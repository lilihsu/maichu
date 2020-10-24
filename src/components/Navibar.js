import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Navibar extends Component {
  render(){
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item position="left">
        EduStream
      </Menu.Item>

      <Menu.Item position="right">
        <Link to="/admin">
          Administrator
        </Link>
      </Menu.Item>
      <Menu.Item position="right">
        <Link to="participant">
          Participant
        </Link>
      </Menu.Item>
    </Menu>
  )
  }
}

export default Navibar;