const items = document.querySelectorAll('.item');
const overlays = document.querySelectorAll('.overlayCard');

fetch('https://randomuser.me/api/?results=12')
  .then(response => response.json())
  .then(data => {
    createItems(data);
    createOverlays(data);
  });

function createItems(data) {
  items.forEach((item, index) => {
    const html = `
    <img src='${data.results[index].picture.large}' alt='${data.results[index].name.last}'>
    <div class="cardtext">
      <h1>${data.results[index].name.first} ${data.results[index].name.last}</h1>
      <p class="email">${data.results[index].email}</p>
      <p>${data.results[index].location.city}</p>
    </div>
    `;
    item.innerHTML = html;
  }, 0);
};

function openOverlay(overlay) {
  document.getElementById(overlay).style.display = "block";
};

function closeOverlay(overlay) {
  document.getElementById(overlay).style.display = "none";
};

function nextOverlay(overlay, next) {
  document.getElementById(overlay).style.display = "none";
  document.getElementById(next).style.display = "block";
};

function previousOverlay(overlay, previous) {
  document.getElementById(overlay).style.display = "none";
  document.getElementById(previous).style.display = "block";
};

function dataFormat(data) {
  const dataFields = data.substr(0, 10).split("-");
  const dob = dataFields[2] + "/" + dataFields[1] + "/" + dataFields[0];
  return dob;
};

function createOverlays(data) {
  overlays.forEach((overlay, index) => {

    let next = 0;
    let previous = 0;

    if (index === 11) {
      next = 0;
    } else {
      next = index + 1;
    };
    if (index === 0) {
      previous = 11;
    } else {
      previous = index - 1;
    }

    let dob = dataFormat(data.results[index].dob.date);

    const html = `
    <div class='oCard'>
      <p class='close' onclick=closeOverlay("overlayCard${index}")>✖</p>
      <img class='oCard-picture' src='${data.results[index].picture.large}' alt='${data.results[index].name.last}'>
      <table>
        <tr>
          <th><label class='backButton' onclick='previousOverlay("overlayCard${index}","overlayCard${previous}")'>←</label></th>
          <th class='oCard-mainText'>
            <h2 class='oCard-name'>${data.results[index].name.first} ${data.results[index].name.last}</h2>
            <p class='oCard-email'>${data.results[index].email}</p>
            <p class='oCard-city'>${data.results[index].location.city}</p>
          </th>
          <th><label class='nextButton' onclick='nextOverlay("overlayCard${index}","overlayCard${next}")'>→</label></th>
        </tr>
      </table>

      <hr>
      <p class='oCard-phone'>${data.results[index].cell}</p>
      <p class='oCard-address'>${data.results[index].location.street.number} ${data.results[index].location.street.name}, ${data.results[index].location.state} ${data.results[index].location.postcode}</p>
      <p class='oCard-bday'>Birthday: ${dob}</p>
    </div>
  `;

    overlay.innerHTML = html;

  }, 0);

};