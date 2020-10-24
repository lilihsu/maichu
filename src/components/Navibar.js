import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';


class Navibar extends Component {
  render(){
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item position="left">
        EduStream
      </Menu.Item>

      <Menu.Item position="right">
        Go to Other Services
      </Menu.Item>
    </Menu>
  )
  }
}

export default Navibar;