"Use Strict"
// Pick the classes
var prodArea = document.querySelector(".product-info");
var optionClass = document.querySelectorAll(".options");
var detailBox = document.querySelectorAll(".detail-box");
// Locate the Product ID
var pageURL = window.location.href;
var posIgual = pageURL.indexOf("=") + 1;
var macetaID = pageURL.substring(posIgual,posIgual + 3);

// Get the info of data.txt
fetch("data/data.json")
    .then(res=>res.json())
    .then(data=> {

        for (let i=0; i < 12; i++) {
            //products.html
            if (macetaID == data.Macetas[i].ID) {
                var selectedImage = data.Macetas[i].Images.PD;
                var selectedPrice = data.Macetas[i].Price.PD - 0.01;
                var HTMLContent = 
                    `
                    <div class="box2"> 
                        <div class="img-box2">
                            <img src="${selectedImage}">
                        </div>
                        <div class="list-at"> 
                            <h2 class="prod-name">${data.Macetas[i].Name}</h2>
                            <h5 class="prod-description">${data.Macetas[i].Description}</h5>
                            <div class="prod-measures">
                             <h5>Medidas:   
                                            <br>
                                            <br>
                                            <span class="prod-largo"> • Largo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp&nbsp&nbsp${data.Macetas[i].Measures.Largo}cm</span>
                                            <br>
                                            <span class="prod-ancho"> • Ancho &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp&nbsp&nbsp${data.Macetas[i].Measures.Ancho}cm</span>
                                            <br>
                                            <span class="prod-alto"> • Alto &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp&nbsp&nbsp${data.Macetas[i].Measures.Alto}cm</span>
                            </h5>
                            </div>
                        <select name="prod-design" id="prod-select">
                                <option value="not-painted">Sin Pintar</option>
                                <option value="painted">Pintada</option>
                                <option value="with-design" selected>Con Diseño</option>
                        </select>
                        <h3 class="prod-price">$${selectedPrice}<h3>
                        <br>
                        </div>
                    </div>
                    `
                prodArea.innerHTML = HTMLContent; 
                let designSelector = document.getElementById("prod-select");
                designSelector.addEventListener('change', (event) => {
                    scroll(0,0);
                    var selectedDesign = event.target.value;
                    var prodPrice = document.querySelector(".prod-price");
                    var prodImage = document.querySelector(".img-box2");
                    if (selectedDesign == "not-painted") {
                        selectedImage = data.Macetas[macetaID - 1].Images.NP;
                        selectedPrice = data.Macetas[macetaID - 1].Price.NP - 0.01;
                        prodPrice.textContent = '$' + selectedPrice;
                        prodImage.innerHTML = `<img src="${selectedImage}">`;
                    } else if (selectedDesign == "painted"){
                        selectedImage = data.Macetas[macetaID - 1].Images.P;
                        selectedPrice = data.Macetas[macetaID - 1].Price.P - 0.01;
                        prodPrice.textContent = '$' + selectedPrice;
                        prodImage.innerHTML = `<img src="${selectedImage}">`;
                    } else {
                        selectedImage = data.Macetas[macetaID - 1].Images.PD;
                        selectedPrice = data.Macetas[macetaID - 1].Price.PD - 0.01;
                        prodPrice.textContent = '$' + selectedPrice;
                        prodImage.innerHTML = `<img src="${selectedImage}">`;
                    }
                });
            }
            ///index.html
            if (window.location.pathname == "/macetas2/products.html") {
                1+1;
            } else if (window.location.pathname == ("/macetas/index.html") || ("/macetas2-v1.2/") || ("/macetas/menu.html")) {
                var arr = [0,3,11,1,6,7,2,4,5,9,8,10]
                var HTMLOptions = optionClass.item(i).firstElementChild;
                HTMLOptions.innerHTML = `$${data.Macetas[arr[i]].Price.NP - 0.01} - $${data.Macetas[arr[i]].Price.PD - 0.01}`;
                var HTMLDescription = detailBox.item(i).firstElementChild.nextElementSibling;
                HTMLDescription.innerHTML = `${data.Macetas[arr[i]].Description}`;
            }
        }

    })
    .catch(err => console.log(err));

    
