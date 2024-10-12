const vocabularySection = document.getElementById("vocabulary");
const vocabularyJSON = "src/json/resultArray.json";

fetch(vocabularyJSON) //data -'https/...'
  .then((response) => response.json())
  .then((data) => outputWords(data))
  .catch((error) => console.log("error"));

function outputWords(data) {
  //   console.log(data);
  const result = data
    .map((val, id) => {
      return `
      <div>
      ${id + 1} - ${val}<br>
      ${(id + 1) % 10 === 0 ? "<br>" : ""}
      </div>
      `;
    })
    .join("");
  vocabularySection.innerHTML = `${result}`;
}
