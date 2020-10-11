document.getElementById("creator").onclick = () => blenderPage()
document.getElementById("mainpage").onclick = () => mainPage()

var searched = 0

var cards = []
var curNum = 0

function addCard() {
    let card = el('.card addCard row', {id: curNum}, el('', {style: {maxWidth: '60%', maxHeight: '60%'}}))
    curNum += 1
    if (curNum < 3) {
        cards[curNum-1] = -1
        document.getElementById("leftContent").insertBefore(card, document.getElementById('leftContent').lastChild)
    }
    else {
        document.getElementById('leftContent').lastChild.remove()
        document.getElementById('leftContent').appendChild(card)
    }
}

function blenderPage() {
    curNum = 0
    cards = []
    // window.history.pushState('creator', 'API creator', '#creator');
    if (document.getElementById('navButton').getAttribute("aria-expanded")=='true') document.getElementById('navButton').click()
    initSide()
    let leftSide = el('.float-left container')
    let leftContent = el('.col overflow-auto',{id:'leftContent', style: {position:'absolute', left: '0', width: '70%', height: '100vh', margin: 'auto' }})

    let plusCard = el('.card addCard addCardHover row-auto', {onclick: () => addCard()}, el('img', {style: {
        maxWidth: '50%', 
        maxHeight: '50%', 
        display: 'block', 
        opacity: '60%', 
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto'
    }, src: 'https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Plus_green-512.png'
    }))

    mount(leftContent, plusCard)
    mount(leftSide, leftContent)
    mount(leftSide, el("button.btn btn-default sticky", { style: {width:"150px",fontSize:'x-large', position:'absolute', right: '35%', top: '10%'}, onclick: () => go(), innerText:'Run!'}))
    mount(leftSide, el("button.btn btn-danger sticky", { style: {width:"150px",color:'white', fontSize:'x-large', position:'absolute', right: '35%', top: '25%'}, onclick: () => blenderPage(), innerText:'Reset'}))
    mount(document.getElementById('mainContent'), leftSide)
}
blenderPage()

async function go() {
    var res
    if (cards[0] != -1 && cards[0] != undefined) {
        console.log(cards[0])
        res = await go2(cards[0])
        cards.splice(1).forEach(async card => {
            console.log(card+"asdad ")
            if (card != -1 && card != undefined) res = await go2(card, res)
        })
    }    
}

async function go2(id, res) {
    console.log(id)
    var params = {}
    var i = 0
    
    var paramVal
    if (!res) {
        apis[id].inputs.forEach(input => {
            params[i] = document.getElementById(id+input).value
            i+=1
        })
    }
    else {
        apis[id].inputs.forEach(input => {
            paramVal = document.getElementById(id+input).value
            if (paramVal) {
                params[i] = paramVal
                document.getElementById(id+input).value = paramVal
            }
            else {
                document.getElementById(id+input).value = res
                params[i] = res
            }
            console.log(params)
            i+=1
        })
    }
    data = await apis[id].run(params)
    document.getElementById(id + 'output').value = data
    return data
}


function initSide() {
    let sideWhole = el(".card sticky float-right overflow-auto", {style: { minWidth: '250px', position:'absolute', right: '0', width: '30%', height: '100vh' }})
    
    let searchBar = 
    el('.row',
        el('.form-inline d-flex justify-content-center md-form form active-cyan-2 mt-2', {style: {color: '#757575', width: '100%'}, action: '#!'}, 
            el('.md-form mt-3', 
                el('input.form-control form-control', { type: "text", id: 'apiSearch', placeholder: 'Search for an Api', style: {minWidth: '200px', maxWidth: '1000px'} }),
                el("i.fas fa-search", {id:'searchBtn', style: {cursor: 'pointer', color:'#25acac'}})
            )
        ),
    )
    
    let main = el(".card-body", {textContent: "Click on the logo to add (choose unique)", style: 'font-size: x-large'}) // iterate through the API list and make a component for each
    
    let apiList = apiCards()
    
    mount(main, searchBar)
    mount(main, apiList)
    mount (sideWhole, main)
    setChildren(document.getElementById('mainContent'), el('.row',sideWhole))

    document.getElementById('apiSearch').addEventListener('input', search)
}

function apiCards() {
    apiList = el('#apiList', el("#nothing", {style: "color: red; display: none", textContent: "Nothing found"}))
    apis.forEach(api => mount(apiList, apiCard(api)))
    return apiList
}

function apiCard(info) {
    let card = el('.card col', {style: 'margin-top: 20px'})
    let cardbody = 
    el('.row', 
        el('.card col-4 col-xl-3 drag-drop', {onclick: () => addToFlow(info.id)}, el('img', {style:'max-width: 80%; max-height:80%; display:block; margin:auto', src: info.imgUrl})),
        el('.col-8 col-xl-9', {textContent: info.name, style: 'font-size: large; padding-top: 20px'},
        el('p', {textContent: info.shortDescription, style: {padding:'0 4px 0', color: '#757575', wordWrap: 'break-word'}})    
        )  
    )   
    mount(card, cardbody)
    return card
}


function addToFlow(id) {
    let current = curNum - 1
    if (curNum-1 == -1) {
        alert("Add a box to proceed")
        return
    }
    if (cards.indexOf(-1) != -1) {
        current = cards.indexOf(-1)
    }
    cards[current] = id
    setChildren(document.getElementById(current), [makeForm(id)])
}

function apiForm(id) {
    const api = apis[id]
    let inputs = 
    el("btn-row" );
    api.inputs.forEach(input => mount(inputs, el(".col-sm btn btn-jx btn-default", {innerText: input})))
    return inputs
}

function makeForm(id) {
    const api = apis[id]
    // let div = el("")
    let inputs = el("form.text-center", {action:'#', style: 'padding-top: 25px'})
    // mount(div, inputs)
    api.inputs.forEach(input => mount(inputs, el('input.form-control', {style:'max-width: 92%; margin:auto', placeholder: input, id: id+input})))
    mount(inputs, el('input.form-control text-center', {style: 'font-size: 1.2rem; max-width: 92%; margin: auto', placeholder: "Output will be shown here", id: id+'output'}))
    mount(inputs, el('button.btn btn-default', {innerText: 'Go!',type: 'submit', onclick: () => go1(id)}))

    return inputs
    
}

async function go1(id) {
    var params = {}
    var i = 0
    apis[id].inputs.forEach(input => {
        params[i] = document.getElementById(id+input).value
        i+=1
    })
    data = await apis[id].run(params)
    document.getElementById(id + 'output').value = data
    console.log(data)
}

function search() {
    const term = document.getElementById('apiSearch').value.toLowerCase()
    const item = apiIdxReference.indexOf(term)
    let ret = el('')
    if (item > -1) {
        setChildren(document.getElementById('apiList'), apiCard(apis[item]))
        searched = 1
    }   
    else if (searched == 1) {
        setChildren(document.getElementById('apiList'), apiCards())
        searched = 0
    }
}




function mainPage() {
    // window.history.pushState('creator', 'API creator', '#main')
    document.getElementById('navButton').click()

    let jumbotron = el('', {style: 'margin-top:50px;',innerHTML: `
  <div class="jumbotron text-center">
    <h2 class="card-title">API Blender: Blend your APIs</h2>
    
    <p class="blue-text my-4 font-weight-bold">A simple and intuitive GUI to build new APIs</p>
    <div class="row d-flex justify-content-center">
      <div class="col-xl-7 pb-2">
      <blockquote><p class="card-text">API blender is the web service that helps you decide which API to use. We provide starred rating of APIs which are based on a variety of metrics. If you are not satisfied by just using a single API and need to chain multiple, then this is your place!. We support chaining multiple Rakuten APIs. In the upcoming versions we are going to provide an option to produce backend code/server that can be applied directly on a device. Not only this, but we will also support flows, where you can alternate between APIs and even synchronize multiple APIs to reach your end goal! As for now you can create your small systems, but in the future you will be able to build complex systems with ease!</p> </blockquote>
      </div>
    </div>
    <hr class="my-4">
    <div class="pt-2">
        <button type="button" id="blender" class="btn btn-raised btn-info">API blender <i class="fas fa-blender ml-1"></i></button>
      <button type="button" id="apiListBtn" class="btn btn-raised btn-primary">API list <span class="fas fa-list ml-1"></span></button>
    </div>
  </div>`})
    
    setChildren(document.getElementById('mainContent'), jumbotron)
    document.getElementById("blender").onclick = () => blenderPage()
}


function apiPage() {
    console.log("APIS")
}

// window.onpopstate = function(e){
//     const url = new URL(window.location.href)
//     const path = url.pathname
//     if (path == '/') mainPage()
//     else if (path == '/creator') blenderPage()
//     else apiPage()
// };
