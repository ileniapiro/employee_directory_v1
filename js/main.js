const items = document.querySelectorAll('.item');
const overlays = document.querySelectorAll('.overlayCard');

//------------------------fetched data from Randomuser------------------------//

function handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

fetch('https://randomuser.me/api/?results=12')
  .then(handleFetchErrors)
  .then(response => response.json())
  .then(data => {
    createItems(data);
    createOverlays(data);
    })
  .catch(error => openAlert(error));

//-------------html created by js for data fetched from Randomuser------------//

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

//-------------------function that create the modal windows------------------//

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

      <table>
        <tr>
          <th><label class='backButton' onclick='previousOverlay("overlayCard${index}","overlayCard${previous}")'>←</label></th>
          <th class='oCard-mainText'>
            <img class='oCard-picture' src='${data.results[index].picture.large}' alt='${data.results[index].name.last}'>
          </th>
          <th><label class='nextButton' onclick='nextOverlay("overlayCard${index}","overlayCard${next}")'>→</label></th>
        </tr>
      </table>

      <h2 class='oCard-name'>${data.results[index].name.first} ${data.results[index].name.last}</h2>
      <p class='oCard-email'>${data.results[index].email}</p>
      <p class='oCard-city'>${data.results[index].location.city}</p>

      <hr>
      <p class='oCard-phone'>${data.results[index].cell}</p>
      <p class='oCard-address'>${data.results[index].location.street.number} ${data.results[index].location.street.name}, ${data.results[index].location.state} ${data.results[index].location.postcode}</p>
      <p class='oCard-bday'>Birthday: ${dob}</p>
    </div>
  `;

    overlay.innerHTML = html;

  }, 0);

};

//----------------------alert windows for mistake in searchbar----------------//

function openAlert(error) {
  document.getElementById("alert").style.display = "block";
  document.getElementById("errorMessage").innerHTML = error;
};

function closeAlert() {
  document.getElementById("alert").style.display = "none";
};

//-----------------------------user search function---------------------------//

function searchEmployee() {
  let input = document.getElementById("search");
  const filter = input.value.toUpperCase();

  if (/^[a-zA-Z0-9- ]*$/.test(filter) == false) {
    openAlert("Inserted a non valid character!");
  }

  const itemsH1 = document.querySelectorAll(".item h1");
  for (let i = 0; i < items.length; i++) {
    if (itemsH1[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  };
};
