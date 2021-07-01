import React, { useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { setLocalStorage } from '../helper';
import { /* useClassState, */ useStateEasyRedux } from '../redux/reducer/EasyRedux';

const initialState = {
  toggleBtn: true,
  email: '',
  shouldRedirect: false,
};

function Login() {
  // const [state, setState] = useClassState(initialState);
  const [state, setState] = useStateEasyRedux(Login, initialState);
  const password = useRef();

  const toggleButtonPlay = (stateCB) => {
    const { email } = stateCB;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const PASSWORD_MIN_LENGTH = 7;

    return !(regexEmail.test(email)
      && password.current.value.length >= PASSWORD_MIN_LENGTH);
  };

  const setButton = (stateCB) => {
    setState({
      toggleBtn: toggleButtonPlay(stateCB),
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({
      // actionType: `SET_${name.toUpperCase()}`,
      [name]: value,
    }, setButton); // state atualizado é injetado automaticamente nessa função setButton
  };

  const { email, toggleBtn, shouldRedirect } = state;

  // mealsToken e cocktailsToken
  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalStorage('user', { email });
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setState({ shouldRedirect: true });
  };

  if (shouldRedirect) return <Redirect to="/comidas" />;
  return (
    <div>
      {/* <header>
        <Link to="/settings" data-testid="btn-settings">Config</Link>
      </header> */}
      <main>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password-input">
            Password:
            <input
              ref={ password }
              id="password-input"
              type="text"
              minLength="7"
              onChange={ handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ toggleBtn }
          >
            ENTRAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;

// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       name: '',
//       toggleBtn: true,
//       shouldRedirect: false,
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.toggleButtonPlay = this.toggleButtonPlay.bind(this);
//     this.fetchToken = this.fetchToken.bind(this);
//   }

//   setButton() {
//     this.setState({
//       toggleBtn: this.toggleButtonPlay(),
//     });
//   }

//   toggleButtonPlay() {
//     const { email, name } = this.state;
//     const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

//     return !(regexEmail.test(email) && name.length);
//   }

//   handleChange({ target: { name, value } }) {
//     this.setState({
//       [name]: value,
//     }, this.setButton);
//   }

//   async fetchToken() {
//     const { email, name } = this.state;
//     const { onSubmit, fetchQuestion, questionSettings } = this.props;
//     const user = {
//       email,
//       name,
//     };

//     const player = {
//       player: {
//         name,
//         assertions: 0,
//         score: 0,
//         gravatarEmail: email,
//       },
//     };

//     try {
//       setLocalStorage('state', player);

//       onSubmit(user);
//       fetchQuestion(questionSettings);

//       this.setState({
//         shouldRedirect: true,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   render() {
//     const { email, name, toggleBtn, shouldRedirect } = this.state;

//     if (shouldRedirect) return <Redirect to="/trivia" />;
//     return (
//       <div>
//         <header>
//           <Link to="/settings" data-testid="btn-settings">Config</Link>
//           <Header />
//         </header>
//         <main>
//           <form>
//             <label htmlFor="email-input">
//               Email:
//               <input
//                 id="email-input"
//                 type="text"
//                 name="email"
//                 value={ email }
//                 onChange={ this.handleChange }
//                 data-testid="input-gravatar-email"
//               />
//             </label>
//             <label htmlFor="name-input">
//               Nome:
//               <input
//                 id="name-input"
//                 type="text"
//                 name="name"
//                 value={ name }
//                 onChange={ this.handleChange }
//                 data-testid="input-player-name"
//               />
//             </label>
//             <button
//               type="button"
//               data-testid="btn-play"
//               onClick={ this.fetchToken }
//               disabled={ toggleBtn }
//             >
//               JOGAR
//             </button>
//           </form>
//         </main>
//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   fetchQuestion: PropTypes.func.isRequired,
//   questionSettings: PropTypes.shape({
//     amount: PropTypes.number,
//     category: PropTypes.string,
//     difficulty: PropTypes.string,
//     type: PropTypes.string,
//     encode: PropTypes.string,
//   }).isRequired,
// };

// const mapStateToProps = (state) => ({
//   // questionSettings: state.settings, // funcionando
//   questionSettings: state.cpnt.Settings,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (payload) => dispatch(loginUserAction(payload)),
//   fetchQuestion: (settingsQuestion, token) => (
//     dispatch(getQuestionsActionThunk(settingsQuestion, token))),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
