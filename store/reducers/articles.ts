const articleReducers = (
    state = {
      trendingArticles: [],
      recentArticles: []
    },
    action
  ) => {
    switch (action.type) {
      case "GET_TRENDING_ARTICLES":
        return {
          ...state,
          trendingArticles: [...state.trendingArticles, action.payload]
        };
      case "GET_RECENT_ARTICLES":
          return {
              ...state,
              recentrticles: [...state.recentArticles, action.payload]
          }
      default:
        return state;
    }
  };
  
  export default articleReducers;