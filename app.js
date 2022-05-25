function inicia(){
    const btadd = document.getElementById("add")
    const cardform = document.getElementById("createcard")
    const btclose = document.getElementById("close")
    const form = document.getElementById("form")
    const feedback = document.getElementById("feedback")
    const dvcards = document.getElementById("cards")
    const colors = ['#CED971', '#E19853', '#77BAE4', '#CF5E9E', '#A577B8', '#D8AAC1']

    let id

    let op = new OP()

    //Coletando as informações do localStorage
    let data = op.recolherLocalStorage() 
    if(data.length > 0){
        id = (data[data.length-1].id) + 1
    }else{
        id = 1
    }
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
            op.clearFields()
            cardform.classList.add("hidden")
        }
    })

    //Manipulando o flash-card DELETE/EDIT/SHOW-HIDE
    dvcards.addEventListener("click", (e) =>{
        if(e.target.classList.contains("show_hide")){ //SHOW|HIDE
            e.target.nextElementSibling.classList.toggle("hidden")
        }
        if(e.target.classList.contains("delete")){ //BOTÃO DELETE
            let id = e.target.dataset.id
            data = data.filter((el) =>{
                return el.id != id
            })
            e.target.parentElement.parentElement.remove()
            op.addLocalStorage(data)
        }
        if(e.target.classList.contains("edit")){ //BOTÃO EDIT
            let id = e.target.dataset.id
            let questionedit = data.filter((el) =>{
                return el.id == id
            })
            data = data.filter((el) =>{
                return el.id != id
            })
            e.target.parentElement.parentElement.remove()
            op.addLocalStorage(data)
            cardform.classList.remove("hidden")
            document.getElementById("questao").value = questionedit[0].question
            document.getElementById("resposta").value = questionedit[0].answer
        }
    })

    // Construtor da função responsável pela exibição
    function OP(){
        OP.prototype.recolherLocalStorage = function(){
            let savedlocalstorage = localStorage.getItem("flashcards")
            if(savedlocalstorage){
                savedlocalstorage = JSON.parse(savedlocalstorage)
                return savedlocalstorage
            }else{
                return savedlocalstorage = []
            }
        }

        OP.prototype.addCard = function(item){
            let color = colors[Math.floor(Math.random()*colors.length)]
            dvcards.insertAdjacentHTML("beforeend", `<div style="background-color: ${color};" class="card"><h2>${item.question}</h2><span class="show_hide">Show/Hide Answer</span><p class="hidden">${item.answer}</p><div class="bts"><button class="edit" data-id="${item.id}">EDIT</button><button class="delete" data-id="${item.id}">DELETE</button></div></div>`)
        }

        OP.prototype.showCardForm = function(){
            cardform.classList.remove("hidden")
        }

        OP.prototype.hideCardForm = function(){
            cardform.classList.add("hidden")
        }

        OP.prototype.addLocalStorage = function(data){
            localStorage.clear()
            localStorage.setItem("flashcards", JSON.stringify(data))
        }

        OP.prototype.clearFields = function(q, a){
            document.getElementById("questao").value = ''
            document.getElementById("resposta").value = ''
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