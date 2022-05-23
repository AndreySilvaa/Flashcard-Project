//Criar o op(objeto principal)
//Verificar se existe localStorage
//se existe somar o id do último, se não criar o primeiro id
//abrir e fechar formulário
//criar a class, pegar as informações do form e criar um novo objeto
//passar as informações do novo objeto para o localstorage
//criar um método para pegar as informações e criar um flashcard

function inicia(){
    const btadd = document.getElementById("add")
    const cardform = document.getElementById("createcard")
    const btclose = document.getElementById("close")
    const form = document.getElementById("form")
    const feedback = document.getElementById("feedback")
    const dvcards = document.getElementById("cards")

    let id

    let op = new OP()

    //Coletando as informações do localStorage
    let data = op.recolherLocalStorage() 
    if(data.length > 0){
        id = (data[data.length-1].id) + 1
    }else{
        id = 1
    }
    console.log(data.length)
    console.log(data)
    data.forEach((item) => {
        op.addCard(item)
    })

    //Abrindo o form
    btadd.addEventListener("click", () =>{
        op.showCardForm()
    })

    //Fechando o form
    btclose.addEventListener("click", () =>{
        op.hideCardForm()
    })

    //Criando o flash-card
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        const question = document.getElementById("questao").value
        const answer = document.getElementById("resposta").value

        if(question == '' || answer == ''){
            feedback.classList.remove("hidden")
            setTimeout(() =>{
                feedback.classList.add("hidden")
            }, 3000)
        }else{
            let card = new Card(id, question, answer)
            id++
            data.push(card)
            op.addCard(card)
            op.addLocalStorage(data)
        }
    })

    //Manipulando o flash-card DELETE/EDIT/SHOW-HIDE

    // Construtor da função responsável pela exibição
    function OP(){
        OP.prototype.recolherLocalStorage = function(){
            let savedlocalstorage = localStorage.getItem("cards")
            if(savedlocalstorage){
                savedlocalstorage = JSON.parse(savedlocalstorage)
                return savedlocalstorage
            }else{
                return savedlocalstorage = []
            }
        }

        OP.prototype.addCard = function(item){
            dvcards.insertAdjacentHTML("beforeend", `<div class="card"><h2>${item.question}</h2><span>Show/Hide Answer</span><p class="hidden">${item.answer}</p><div class="bts"><button class="edit" data-id="${item.id}">EDIT</button><button class="delete" data-id="${item.id}">DELETE</button></div></div>`)
        }

        OP.prototype.showCardForm = function(){
            cardform.classList.remove("hidden")
        }

        OP.prototype.hideCardForm = function(){
            cardform.classList.add("hidden")
        }

        OP.prototype.addLocalStorage = function(data){
            localStorage.clear()
            localStorage.setItem("cards", JSON.stringify(data))
        }
    }

    // Objeto card
    function Card(id, question, answer){
        this.id = id
        this.question = question
        this.answer = answer
    }
}

window.addEventListener("load", inicia)