export async function searchData(keyword) {
  return (
    await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${keyword}&gsrlimit=20&prop=pageimages|extracts&exchars=100&exintro&explaintext&exlimit=max&format=json&origin=*`
    )
  ).json();
}
