import React from 'react';
import { string } from 'prop-types';
import { last } from 'lodash';

import YOUTUBE_EMBED_VIDEO from '../../services/youtube';

function Video({ url }) {
  const id = last(url.split('='));
  return (
    <iframe
      title="Como fazer"
      className="video-detalhes"
      src={ YOUTUBE_EMBED_VIDEO(id) }
      data-testid="video"
    />
  );
}

Video.propTypes = {
  url: string.isRequired,
};

export default Video;
