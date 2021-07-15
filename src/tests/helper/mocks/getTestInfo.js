const explorebtn = 'explore-bottom-btn';

const testsIds = {
  headerTestIds: {
    profileTopButton: 'profile-top-btn',
    pageTitle: 'page-title',
    searchTopButton: 'search-top-btn',
  },
  footerTestIds: {
    footer: 'footer',
    drinksBottonBtn: 'drinks-bottom-btn',
    exploreBottonBtn: explorebtn,
    foodBottonBtn: 'food-bottom-btn',
    drinkIcon: 'drinks-bottom-btn',
    exploreIcon: explorebtn,
    mealIcon: 'food-bottom-btn',
  },
};

const headerRenderTests = () => {
  const { headerTestIds } = testsIds;

  const itRenderAllIcons = (get) => {
    expect(get(headerTestIds.profileTopButton)).toBeInTheDocument();
    expect(get(headerTestIds.pageTitle)).toBeInTheDocument();
    expect(get(headerTestIds.searchTopButton)).toBeInTheDocument();
  };

  const itDoesntRenderHeader = (query) => {
    expect(query(headerTestIds.profileTopButton)).toBeNull();
    expect(query(headerTestIds.pageTitle)).toBeNull();
    expect(query(headerTestIds.searchTopButton)).toBeNull();
  };

  const itDoesntRenderSearchIcon = (query, get) => {
    expect(get(headerTestIds.profileTopButton)).toBeInTheDocument();
    expect(get(headerTestIds.pageTitle)).toBeInTheDocument();
    expect(query(headerTestIds.searchTopButton)).toBeNull();
  };

  return { itRenderAllIcons, itDoesntRenderHeader, itDoesntRenderSearchIcon };
};

const footerRenderTests = () => {
  const { footerTestIds } = testsIds;

  const itDoesntRenderFooter = (query) => {
    expect(query(footerTestIds.drinkIcon)).toBeNull();
    expect(query(footerTestIds.exploreIcon)).toBeNull();
    expect(query(footerTestIds.mealIcon)).toBeNull();
  };

  const itRenderAllIcons = (get) => {
    expect(get(footerTestIds.drinkIcon)).toBeInTheDocument();
    expect(get(footerTestIds.exploreIcon)).toBeInTheDocument();
    expect(get(footerTestIds.mealIcon)).toBeInTheDocument();
  };

  return { itDoesntRenderFooter, itRenderAllIcons };
};

const recipeCardsTest = async ({ id, name, image }, findByTestId) => {
  const sectionCard = await findByTestId(`${id}-recipe-card`);
  const titleCard = await findByTestId(`${id}-card-name`);
  const imgCard = await findByTestId(`${id}-card-img`);

  expect(sectionCard).toBeInTheDocument();
  expect(titleCard).toHaveTextContent(name);
  expect(imgCard).toHaveAttribute('src', image);
};

const doTheLoginProcess = (getId, userEvent) => {
  const passwordInput = getId('password-input');
  const emailInput = getId('email-input');
  const loginSubmitButton = getId('login-submit-btn');

  userEvent.type(emailInput, 'renzo@gmail.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(loginSubmitButton);
};

const redirectToProfileScreen = (getId, userEvent) => {
  doTheLoginProcess(getId, userEvent);

  const profilePageButton = getId('profile-top-btn');
  userEvent.click(profilePageButton);
};

const redirectToExploreScreen = (getId, userEvent) => {
  doTheLoginProcess(getId, userEvent);

  const exploreBtnIcon = getId('explore-bottom-btn');
  userEvent.click(exploreBtnIcon);
};

const redirectToExploreTypeScreen = (getId, userEvent, type) => {
  redirectToExploreScreen(getId, userEvent);

  const typeExplorePageButton = getId(`explore-${type}`);
  userEvent.click(typeExplorePageButton);
};

export default function getTestInfo() {
  return {
    headerRenderTests,
    footerRenderTests,
    recipeCardsTest,
    doTheLoginProcess,
    redirectToProfileScreen,
    redirectToExploreScreen,
    redirectToExploreTypeScreen,
    testsIds,
  };
}
