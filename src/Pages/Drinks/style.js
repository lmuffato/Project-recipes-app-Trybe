import colors from '../../Styles/colors';

const style = {
  init: {
    boxShadow: '-1px -2px 10px 2px rgba(124,20,44,0.57)',
    bottom: '0px',
    position: 'fixed',
    width: '100vw',
    padding: 15,
    color: colors.cor3,
    backgroundColor: colors.cor1,
    border: 'none',
    fontFamily: colors.font,
    fontWeight: 'bold',
    fontSize: 15,
  },
  p: {
    width: '46vw',
    textAlign: 'center',
  },
  recipeCard: {
    backgroundColor: colors.cor1,
    paddingBottom: 10,
  },
  recipeDesc: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    fontSize: 20,
    fontFamily: colors.font,
    fontWeight: 'bold',
    color: colors.cor3,
  },
  button: {
    border: 'none',
    backgroundColor: colors.cor1,
  },
  image: {
    borderRadius: 10,
    boxShadow: '0 10px 15px 3px rgb(84, 43, 41)',
    width: '95vw',
    margin: 10,
  },
  recipe: {
    backgroundColor: colors.cor1,
    color: colors.cor3,
    padding: 5,
    fontSize: 20,
  },
  recomendation: {
    backgroundColor: colors.cor1,
    color: colors.cor3,
    paddingBottom: 40,
    fontSize: 20,
  },
};

export default style;
