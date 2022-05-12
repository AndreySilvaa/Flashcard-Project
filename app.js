//abrir e fechar formulário
//criar a class, pegar as informações do form e criar um novo objeto
//passar as informações do novo objeto para o localstorage
//criar um método para pegar as informações e criar um flashcard

(function(){
    const addbt = document.getElementById("add")
    const form = document.getElementById("createcard")
    const close = document.getElementById("close")
    const save = document.getElementById("save")

    let flashcards = []


    addbt.addEventListener("click", () =>{
        form.classList.remove("hidden")
    })

    close.addEventListener("click", () =>{
        form.classList.add("hidden")
    })


    // ADICIONANDO A CLASS  
    class flashcard{
        constructor(question, answer){
            this.question = question
            this.answer = answer
        }
    }

    class Display{}

    // CHAMANDO O LOCALSTORAGE
    function getstorage(){
        let cards = localStorage.getItem("cards")
        if(cards == null){
            flashcards = []
        }else{
            flashcards = JSON.parse(cards)
            getlocalstorage(flashcards)
        }
    }

    getstorage()

    // COLETANDO AS INFORMAÇÕES DO FORM
    save.addEventListener("click", (e) =>{
        e.preventDefault()

        let que = document.getElementById("questao")
        let re = document.getElementById("resposta")

        let card = new flashcard(que.value, re.value)
        let display = new Display()
        flashcards.push(card)
        display.passinfo(flashcards)
        getlocalstorage(flashcards)
    })


    // PASSANDO AS INFORMAÇÕES PARA O LOCALSTORAGE
    Display.prototype.passinfo = function(cards){
            localStorage.setItem("cards", JSON.stringify(cards))
    }

    // INSERINDO O HTML
    function getlocalstorage(cards){
        let dvcards = document.getElementById("cards")
        cards.forEach((card) =>{
            dvcards.insertAdjacentHTML("beforeend", `<div class="card"><h2>${card.question}</h2><span>Show/Hide Answer</span><p>${card.answer}</p><div class="bts"><button class="edit">EDIT</button><button class="delete">DELETE</button></div></div>`)
        })
    }
})()