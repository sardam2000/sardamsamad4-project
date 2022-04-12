fetch(
    `https://api.fastforex.io/currencies?api_key=30643cd368-c2ac904341-r9tb2i`
)
    .then((response) => response.json())
    .then((data) => {
        // document.getElementById("city").innerText = data.locality;
        // document.getElementById("country").innerText = data.countryName;
        var cure =  Object.keys(data.currencies)
       
        var fromSel = document.getElementById('fromSel');
        for (var i = 0; i < cure.length; i++) {

            fromSel.innerHTML = fromSel.innerHTML +
                '<option value="' + i+ '">' + cure[i] + '</option>';
        }
        var toSel = document.getElementById('toSel');
        for (var i = 0; i < cure.length; i++) {
            toSel.innerHTML = toSel.innerHTML +
                '<option value="' + i+ '">' + cure[i] + '</option>';
        }
    })
    .catch((err) => console.log(err));

document.getElementById("exchangeBtn").addEventListener("click", function(event){
    event.preventDefault()
    var fromSel = document.getElementById("fromSel");
    var from =fromSel.options[fromSel.selectedIndex].text;

    var toSel = document.getElementById("toSel");
    var to = toSel.options[toSel.selectedIndex].text;

    var amount = document.getElementById("inputAmount").value;

    fetch(
        `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&api_key=30643cd368-c2ac904341-r9tb2i`
    )
        .then((response) => response.json())
        .then((data) => {
            // document.getElementById("city").innerText = data.locality;
            // document.getElementById("country").innerText = data.countryName;
            var res =  `${amount}-${from} = ${to}  ${data.result[`${to}`]}`
            console.log(res);
    
           document.getElementById('resultchange').value = res
            
        })
        .catch((err) => console.log(err));
  });