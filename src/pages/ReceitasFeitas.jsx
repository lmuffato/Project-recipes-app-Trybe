import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class ReceitasFeitas extends React.Component {
  constructor(props) {
    super(props);
    this.copy = this.copy.bind(this);
    this.timer = this.timer.bind(this);
  }

  timer() {
    const div = document.querySelector('#recipeCopy');
    const tagP = document.querySelector('#tagP');
    div.removeChild(tagP);
  }

  copy() {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const div = document.querySelector('#recipeCopy');
    const tagP = document.createElement('p');
    div.appendChild(tagP);
    tagP.setAttribute('id', 'tagP');
    tagP.innerText = 'Link copiado!';
    const time = 15000;
    setTimeout(this.timer, time);
  }

  render() {
    return (
      <>
        <Header title="Receitas Feitas" />
        <div> RECEITAS FEITAS</div>
        <div id="recipeCopy">
          <input
            type="image"
            data-testid="0-horizontal-share-btn"
            src={ shareIcon }
            alt="Compartilhar receita"
            onClick={ this.copy }
          />
        </div>
      </>
    );
  }
}

export default ReceitasFeitas;
