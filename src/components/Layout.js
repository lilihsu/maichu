import React , {Component} from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Navibar';

class Layout extends Component {
    
    render() {
        return (
            <Container>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <Header />
                {this.props.children}
            </Container>
        );
    }
};

export default Layout;