'use strict';

const React = require('react-native');
const {
  StyleSheet,
  Text,
  View
  } = React;

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

const Example = React.createClass({
  componentDidMount() {
    // We can use the public context API to open/close/toggle the menu.
    //setInterval(() => {
    //  this.refs.MenuContext.toggleMenu('menu1');
    //}, 2000);
  },
  getInitialState() {
    return {
      message: 'Click the top-right menu triggers',
      firstMenuDisabled: false
    };
  },
  setMessage(value) {
    if (typeof value === 'string') {
      this.setState({ message: `You selected "${value}"` });
    } else {
      this.setState({ message: `Woah!\n\nYou selected an object:\n\n${JSON.stringify(value)}` });
    }
    return value !== 'do not close';
  },
  setFirstMenuDisabled(disabled) {
    this.setState({
      message: `First menu is ${disabled ? 'disabled' : 'enabled'}`,
      firstMenuDisabled: disabled
    });
  },
  render() {
    return (
      <MenuContext style={{ flex: 1 }} ref="MenuContext">
        <View style={styles.topbar}>
          <View style={styles.title}>
            <Text style={styles.titleText}>First</Text>
          </View>
          <Menu name ="menu1" onSelect={this.setMessage}>
            <MenuTrigger disabled={this.state.firstMenuDisabled} style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption value="normal">
                <Text>Normal option</Text>
              </MenuOption>
              <MenuOption value="do not close">
                <Text>Does not close menu</Text>
              </MenuOption>
              <MenuOption value="disabled" disabled={true}>
                <Text style={styles.disabled}>Disabled option</Text>
              </MenuOption>
              <View style={styles.divider}/>
              <MenuOption value={{ message: 'Hello World!' }}>
                <Text>Option with object value</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={[styles.topbar, { backgroundColor: '#333' }]}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Second</Text>
          </View>
          <Menu name="menu2" onSelect={this.setFirstMenuDisabled}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
              {
                this.state.firstMenuDisabled
                  ? (
                    <MenuOption value={false}>
                      <Text>enable first menu</Text>
                    </MenuOption>
                  )
                  : (
                  <MenuOption value={true}>
                    <Text>disable first menu</Text>
                  </MenuOption>
                )
              }
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText} onPress={() => React.ToastAndroid.show('Hello!', React.ToastAndroid.SHORT)}>
            { this.state.message }
          </Text>
        </View>
      </MenuContext>
    );
  }
});

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 5
  },
  titleText: {
    color: '#ddd',
    fontSize: 20
  },
  menuTrigger: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  content: { flex: 1, alignItems: 'center', backgroundColor: 'white',justifyContent: 'center' },
  contentText: { fontSize: 20 }
});

module.exports = Example;
