import React from 'react';

function Perfil() {
  return (
    <div>

      <img src="" alt="Imagem de perfil" />
      <h3 data-testid="profile-email">Teste</h3>

      <button
        name="Receitas Feitas"
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        name="Receitas Favoritas"
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        name="Sair"
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <footer>
        <img src="/logo_darkbg.svg" alt="Squarefood" />
      </footer>
    </div>
  );
}

export default Perfil;
