
document.addEventListener('DOMContentLoaded', function() {
    Options('https://api.tech.redventures.com.br/broths','broths');
    Options('https://api.tech.redventures.com.br/proteins','proteins');
})

function Options (url, selectId) {
     fetch(url, {
        headers: {
            "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf"
        }
     })
     .then(response => response.json())
     .then( data => {
        console.log('ver', selectId);
        const select = document.getElementById(selectId);
        console.log('ver select', select);
        select.innerHTML = '';
        data.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.textContent = option.name;
            select.appendChild(optionElement);
        });
     })
     .catch(error => console.error('Erro ao carregar opções:',error));
}

function pedido() {
    const selected_broth_id = document.getElementById('broths').value;
    const selected_protein_id = document.getElementById('proteins').value;

    console.log("Pedido : caldo " , selected_broth_id," Proteina ",selected_protein_id )


    const apiUrl = 'https://api.tech.redventures.com.br/order';
    const apiKey = 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf';
    const pedidoData = {
        "brothId": selected_broth_id,
        "proteinId": selected_protein_id
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        body:JSON.stringify(pedidoData)
    };

    fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok){
            throw new Error( 'Erro ao fazer a requisição');
        }
        return response.json();
    })
    .then( data => {
        console.log("Resposta da API: ", data.id);
        let id = document.getElementById('numeroPedido');
        id.textContent ="Número do pedido: "+ data.id
        let description = document.getElementById('description');
        description.textContent ="Descrição do pedido: "+ data.description 

        let image = document.getElementById('img');
        image.src = data.image
        
        
        modal();
    })
    .catch(error =>{
        console.error('Erro',  error);
    });
}


/* Modal */
function modal() {
    let modal = document.getElementById('pedidoModal');
    modal.style.display = 'block';
}

let close = document.getElementsByClassName('close')[0];
close.onclick = function() {
    let modal = document.getElementById('pedidoModal');
    modal.style.display = 'none';
    location.reload(true)
}



