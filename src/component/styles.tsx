import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  header: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 8,
    flexDirection: 'column',
    gap: 15,
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
  },
  footer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#FCC435',
    borderRadius: 64,
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    paddingTop: 10,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F2F2F2',
  },
});
