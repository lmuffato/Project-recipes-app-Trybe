import React from 'react';
import LinkIcon from '../shared/link';
import { linkDrink, linkExplorer, linkFood } from './Data';

function Footer() {
  return (
    <footer data-testid="footer">
      <LinkIcon { ...linkDrink } />
      <LinkIcon { ...linkExplorer } />
      <LinkIcon { ...linkFood } />
    </footer>
  );
}

export default Footer;
