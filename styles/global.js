import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  fontSize: {
    fontSize: 20,
  },
  card: {
    height: 180
  },
  input: {
    fontSize: 20,
    flex: 5
  },
  inputIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 50,
    position: 'relative',

  },
  output: {
    fontSize: 20,
    flex: 1
  },
  languageBox: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  switch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBar :{
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  topBarText : {
    alignItems: "center",
    justifyContent: 'flex-end',
    height: 60,
  },
  upperBox:{
    flexDirection: 'row',
    height: 100
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'skyblue',
  },
  outputContainer:{
    flexDirection: 'row'
  },
  flex2: {
    flex: 2
  },
  outputLower: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  }
});