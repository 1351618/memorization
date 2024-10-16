const words_sect = document.getElementById("words");
const wordsData = "src/json/words.json";

fetch(wordsData) //data -'https/...'
  .then((response) => response.json())
  .then((data) => outputToPage(data))
  .catch((error) => console.log("error"));

function outputToPage(data) {
  const numbOfTransl = Object.keys(data[1].lang);
  console.log(numbOfTransl);
  let checkboxStates = {};
  const words_content = `
  <div class="words__lang-switch">${numbOfTransl
    .map((val) => {
      return `<label>
      <input type="checkbox" onchange="updateCheckboxState('${val}', this.checked)"> ${val}
    </label>`;
    })
    .join("")}</div>
  <div class="words__cont">
    ${Array.from(
      { length: Math.ceil(Object.keys(data).length / 100) },
      (_, i) => {
        const start = i * 100;
        const end = start + 100;
        const listItems = Object.keys(data)
          .slice(start, end)
          .map((key, index) => {
            const liIndex = start + index + 1; // Индекс для li
            // Определяем, нужно ли вставлять <br> после каждого 10-го элемента
            const br =
              (index + 1) % 10 === 0 && (start + index + 1) % 100 !== 0
                ? "<br>"
                : "";
            return `<li>
                <input type="checkbox">
                <i>${liIndex}</i>
                <b>${data[key].word}</b>
                ${numbOfTransl.length === 0 ? `` : ``}
          
            </li>${br}`;
          })
          .join("");

        return `<ul>${listItems}</ul>`;
      }
    ).join("")}
    </div>
    `;

  // Функция для обновления состояния чекбоксов
  window.updateCheckboxState = function (language, isChecked) {
    checkboxStates[language] = isChecked;
    console.log(checkboxStates); // Вывод состояния в консоль для проверки
  };

  words_sect.innerHTML = words_content;
}
