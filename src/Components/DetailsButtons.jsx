import React from 'react';


function DetailsButtons () {
    const [isAFavorite, setFavorite] = React.useState(false);

    const handleCli = () => {
        if (isAFavorite === false) {
            setFavorite(true)
        }
    };
    return (
        <>
          <button data-testid="share-btn">Share</button>
          <button data-testid="favorite-btn" onClick ={ handleCli }>Bookmark</button>
        </>
    )
}

export default DetailsButtons