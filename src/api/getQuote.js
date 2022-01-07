const url = 'https://api.quotable.io/random';

async function getQuote() {
  const response = fetch(url);
  const data = (await response).json();
  const { content, author } = await data;
  return { content, author };
}

export default getQuote;
