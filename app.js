//abrir e fechar formulário
//criar a class, pegar as informações do form e criar um novo objeto
//passar as informações do novo objeto para o localstorage
//criar um método para pegar as informações e criar um flashcard

(function(){
    const addbt = document.getElementById("add")
    const form = document.getElementById("createcard")
    const close = document.getElementById("close")
    const save = document.getElementById("save")
    const colors = ["#CED971", "#E19853", "#77BAE4", "#CF5E9E", "#A577B8", "#E1A8C4"]
    var flashcards = []


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
        let item = [flashcards[flashcards.length-1]]
        getlocalstorage(item)
        form.classList.add("hidden")
        que.innerText = ''
        re.innerText = ""
    })


    // PASSANDO AS INFORMAÇÕES PARA O LOCALSTORAGE
    Display.prototype.passinfo = function(cards){
            localStorage.setItem("cards", JSON.stringify(cards))
    }

    // INSERINDO O HTML
    function getlocalstorage(cards){
        let dvcards = document.getElementById("cards")
        cards.forEach((card) =>{
            let cor = colors[Math.round(Math.random()*colors.length-1)]
            dvcards.insertAdjacentHTML("beforeend", `<div class="card" style="background-color: ${cor};"><h2>${card.question}</h2><span onclick="muda(this)">Show/Hide Answer</span><p class="hidden">${card.answer}</p><div class="bts"><button class="edit">EDIT</button><button class="delete">DELETE</button></div></div>`)

            // BOTÃO DELETE
            let btdel = document.getElementsByClassName("delete")
            btdel[btdel.length-1].addEventListener("click", (e) =>{
                let name = e.currentTarget.parentElement.parentElement.querySelector("h2").innerText
                e.currentTarget.parentElement.parentElement.remove()
                flashcards = flashcards.filter((ob) =>{
                    return ob.question != name
                })
                localStorage.setItem("cards", JSON.stringify(flashcards))
            })
            
            // BOTÃO EDIT
            let btedit = document.getElementsByClassName("edit")
            btedit[btedit.length-1].addEventListener("click", (e) =>{
                let pergunta = e.currentTarget.parentElement.parentElement.querySelector("h2").innerText
                let resposta = e.currentTarget.parentElement.parentElement.querySelector("p").innerText

                e.currentTarget.parentElement.parentElement.remove()
                flashcards = flashcards.filter((ob) =>{
                    return ob.question != pergunta
                })
                localStorage.setItem("cards", JSON.stringify(flashcards))

                form.classList.remove("hidden")
                let que = document.getElementById("questao").innerText = pergunta
                let re = document.getElementById("resposta").innerText = resposta
            })
        })
    }
})()
//SHOW/HIDE
function muda(e){
    console.log(e.nextElementSibling.classList.toggle("hidden"))
}