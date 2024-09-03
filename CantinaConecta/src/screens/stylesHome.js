import { Container } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375; 

const scaleFont = (size) => Math.round(size * scale);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContent: {
    backgroundColor: '#fff',
  },
  footerSpacer: {
    height: 80 * scale, 
    backgroundColor: '#F2EFEF',
  },
  home: {
    backgroundColor: '#F2EFEF',
    flex: 1,
    paddingHorizontal: 16 * scale,
    paddingVertical: 20 * scale,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10 * scale,
  },
  card: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
    padding: 20 * scale,
    borderRadius: 8 * scale,
    alignItems: 'center',
    width: width * 0.4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  noticeContainer: {
    padding: 20 * scale,
    backgroundColor: '#F8F8FF',
    borderRadius: 8 * scale,
    marginHorizontal: 16 * scale,
    marginVertical: 10 * scale,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10 * scale,
    paddingHorizontal: 16 * scale,
  },
  stat: {
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
    padding: 20 * scale,
    borderRadius: 8 * scale,
    width: '48%', // Use a percentage for width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  statNumber: {
    alignItems: 'center',
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  statText: {
    justifyContent: 'center',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15 * scale,
    backgroundColor: '#0000FF',
    borderRadius: 30 * scale,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
    margin: 8 * scale,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginLeft: 10 * scale,
  },
  ContainerButton: {
    position: 'absolute',
    bottom: 5 * scale,
    right: 10 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10 * scale,
  },
  hall: {
    backgroundColor: '#87CEFA',
    borderRadius: 8 * scale,
  },
});

export default styles;
