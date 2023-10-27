const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
const products_domain = process.env.NEXT_PUBLIC_DOMAIN as string
const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

export const API_REQUEST = {
  trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
  top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-US`,
  tv_top_rated: `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US`,
  movie_popular: `${base_url}/movie/popular?api_key=${api_key}&language=en-US`,

  action: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=28`,
  comedy: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=35`,
  documnetary: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=99`,
  family: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=10751`,
  history: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genres=36`,
  products_list:`${products_domain}/api/products`,
  subscription:`${products_domain}/api/subscription`
};
