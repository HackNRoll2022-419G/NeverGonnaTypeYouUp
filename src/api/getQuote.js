const url = 'https://api.quotable.io/random';

async function getQuote() {
  const response = fetch(url);
  const data = (await response).json();
  const { content } = await data;
  return content;
}

export default getQuote;
