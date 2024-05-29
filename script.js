// Start Search section
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', getPlayerList);

function getPlayerList() {
    const searchInputTxt = document.getElementById("search-input").value;
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            displayPlayer_info(data.player);
        });
}
// End Search section

const loadAllProduct = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal')
        .then(res => res.json())
        .then(data => {
            displayPlayer_info(data.player);
        })
};

const displayPlayer_info = (Player_info) => {
    const PlayerContainer = document.getElementById('detail-container');
    PlayerContainer.innerHTML = '';

    Player_info.forEach(Player => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img class="img" src="${Player.strThumb}" alt="" />
            <h5>${Player.strPlayer}</h5>
            <p>${Player.strBirthLocation}</p>
            <div class="d-flex gap-3">
                <button onclick="singlePlayer('${Player.idPlayer}')" type="button" class="btn btn-primary btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Details
                </button>
                <button onclick="handleAddCart('${Player.strPlayer}', '${Player.strThumb}')" type="button" class="btn btn-primary btn-sm mb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop-11">
                    ADD TO GROUP
                </button>
            </div>

            <div class="d-flex gap-4 mt-3">
                <a style="text-decoration:none;" href="https://${Player.strTwitter}" class="icon-link" target="_blank"><i class="fab fa-twitter"></i></a>
                <a style="text-decoration:none;" href="https://${Player.strInstagram}" class="icon-link" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
        `;
        PlayerContainer.appendChild(div);
    });
};

const handleAddCart = (name, image) => {
    const cartCount = document.getElementById('count').innerText;
    let convertedCount = parseInt(cartCount);
    console.log(convertedCount);
    convertedCount += 1;
    if (convertedCount <= 11) {
        document.getElementById('count').innerText = convertedCount;

        const container = document.getElementById('cart-main-container');
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <img class="img-in" src="${image}" style="width: 50px; height: 50px; object-fit: cover;" />
        <p>${name}</p>
        <hr>
    `;
        container.appendChild(div);
    } else {
        convertedCount = 11;
        document.getElementById('count').innerText = convertedCount;

        const container = document.getElementById('cart-main-container');
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
        <div><h3>Sorry! More than 11 people cannot be added to the group.</h3></div>
    `;
        container.appendChild(div);
    }
};

const singlePlayer = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            displayDetails(data.players[0]);
        })
};

const displayDetails = (detail) => {
    const detailContainer = document.getElementById('detail-container-1');
    detailContainer.innerHTML = '';
    const div = document.createElement("div");
    div.classList.add("detail-card");
    div.innerHTML = `
        <img class="img" src="${detail.strThumb}" alt="${detail.strPlayer}" />
        <h5>${detail.strPlayer}</h5>
        <p>${detail.strDescriptionEN.slice(0, 100)}</p>
        <h6>Gender: ${detail.strGender}</h6>
        <h6>Date of Birth: ${detail.dateBorn}</h6>
        <h6>Weight: ${detail.strWeight}</h6>
        <h6>Player Ground Position: ${detail.strPosition}</h6>
        <h6>Agent: ${detail.strAgent}</h6>
    `;
    detailContainer.appendChild(div);
};

loadAllProduct();
