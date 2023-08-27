export async function filterByQueryAndCategories(query, activeCategories) {
  const jsonData = await fetch(
    `${process.env.REACT_APP_API}/movie/filter?query=${query}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genre: activeCategories,
      }),
    }
  );
  const data = await jsonData.json();
  return data;
}
