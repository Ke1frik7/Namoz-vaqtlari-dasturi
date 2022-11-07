let API = "https://islomapi.uz/api/present/day?region="
let form = renderElement("form")
let input = renderElement("input")
let parent = renderElement(".hero__cards")
let template = renderElement("template").content
let hafta_kun = renderElement(".hafta__kun")
let REGION_TITLE = renderElement(".region__title")
let quyosh = renderElement(".quyosh__chiqishi")
let Error = renderElement(".error")
let ERROR_TEXT = renderElement(".error__text")
let body = document.querySelector(".body")
let result = []
window.addEventListener("load", () => {
    let checkbox = renderElement(".checkbox")
    checkbox.addEventListener("change", readyChange)
    function readyChange(){
        body.classList.toggle("whites")
    }
})
const handleSub = (e) => {
    e.preventDefault()
    let inputValue = input.value
    fetchs(API, inputValue)
    .catch((error) => {
        if(error instanceof  SyntaxError){
            errors()
        }
    })
}
form.addEventListener("submit", handleSub)
let clasesArray = []
function errors(){
    parent.innerHTML = null
    REGION_TITLE.textContent = "ERROR"
    hafta_kun.textContent = "ERROR"
    quyosh.textContent = "ERROR"
    Error.classList.add("block")
}
async function fetchs(API, value){
    let links = await fetch(API + value)
    let response = await links.json()
    result =[...result, response]
    if(result.length > 1){
        result.splice(0, 1)
    }
    renders(result)
}
;(async function(){
    let expert = await axios({
        method: "GET", 
        url: "https://islomapi.uz/api/present/day?region=Samarqand"
    })
    let res =await expert.data
    result =[...result, res]
    renders(result)
}())
function renders(arr){
    Error.classList.remove("block")
    parent.innerHTML = null
    for(let i = 0; i<arr.length; i++){
        REGION_TITLE.textContent = arr[i].region
        let times = arr[i].times
        console.log(times)
        let clone = template.cloneNode(true)
        let bomdod_vaqt = clone.querySelector(".bomdod__vaqt")
        bomdod_vaqt.textContent = times.tong_saharlik
        let peshin_vaqt = clone.querySelector(".peshin__vaqt")
        peshin_vaqt.textContent = times.peshin
        let asr_vaqt = clone.querySelector(".asr__vaqt")
        asr_vaqt.textContent = times.asr
        let shom_vaqt = clone.querySelector(".shom__vaqt")
        shom_vaqt.textContent = times.shom_iftor
        let hufton_vaqt = clone.querySelector(".hufton__vaqt")
        hufton_vaqt.textContent = times.hufton
        hafta_kun.textContent = arr[i].weekday
        let quyosh_chiqishi = renderElement(".quyosh__chiqishi")
        quyosh_chiqishi.textContent = times.quyosh
        parent.appendChild(clone)
        console.log(arr[i])
    }
}