// import React from 'react';

// function Login() {

//   validateFields() {
//     const { email, name } = this.state;
//     const nameLength = 6;
//     const validate = /\S+@\S+\.\S+/;
//     const emailValidate = validate.test(email);
//     const nameValidate = name.length >= nameLength;
//     this.setState({ disable: !(emailValidate && nameValidate) }); // Logica dessa liha desenvolvida com a ajuda de: João Nascimento
//   }

//   handleChange({ target: { name, value } }) {
//     this.setState({
//       [name]: value,
//     });
//   }

//   return (
//     <form>
//       <label htmlFor="email-input">
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           id="email-input"
//           data-testid="input-gravatar-email"
//           onChange={ this.handleChange }
//         />
//       </label>
//       <br />
//       <label htmlFor="name-input">
//         <input
//           type="text"
//           placeholder="Nome"
//           name="name"
//           id="name-input"
//           data-testid="input-player-name"
//           onChange={ this.handleChange }
//         />
//       </label>
//       <button
//         data-testid="btn-play"
//         type="button"
//         disabled={ disable }
//         onClick={ this.handleClick }
//       >
//         Jogar
//       </button>
//       <button data-testid="btn-settings" type="button">
//         <Link to="/settings">Configurações</Link>
//       </button>
//     </form>
//   );
// }

// export default Login;
