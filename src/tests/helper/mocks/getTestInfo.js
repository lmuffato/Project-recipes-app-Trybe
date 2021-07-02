const testsIds = {
  headerTestIds: {
    profileTopButton: 'profile-top-btn',
    pageTitle: 'page-title',
    searchTopButton: 'search-top-btn',
  },
  footerTestIds: {
    footer: 'footer',
    drinksBottonBtn: 'drinks-bottom-btn',
    exploreBottonBtn: 'explore-bottom-btn',
    foodBottonBtn: 'food-bottom-btn',
    drinkIcon: 'drinks-bottom-btn',
    exploreIcon: 'explore-bottom-btn',
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

export default function getTestInfo(path = '/') {
  const recipe = { meals: [], drinks: [] };
  const renderEmptyValue = {
    value: { recipe },
    initialEntries: [path],
  };

  return {
    renderEmptyValue,
    headerRenderTests,
    footerRenderTests,
    testsIds,
  };
}
