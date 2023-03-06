let selectTag = document.querySelectorAll('select') ; 
let translateBtn = document.getElementById('translate') ; 
let myText = document.getElementById('left-area') ;
let TranslatedText = document.getElementById('right-area') ;  
let Switch = document.getElementById('switch') ; 
let copy = document.querySelectorAll('#copy') ; 
let voice = document.querySelectorAll('#audio') ; 
//

window.addEventListener('click' , e=> { 
  if (e.target.id == 'audio') {
    let utterance ; 
    if (e.target === voice[0]) {  
      utterance = new SpeechSynthesisUtterance(myText.value);
      utterance.lang = selectTag[0].value ;
  }
  else { 
    utterance = new SpeechSynthesisUtterance(TranslatedText.value);
    utterance.lang = selectTag[1].value ;
  }
  speechSynthesis.speak(utterance);
}
  if (e.target.id == 'copy') {
    if (e.target === copy[0]) {  
    navigator.clipboard.writeText(myText.value);
    alert("Copied the text: " +myText.value);
  }
  else { 
    navigator.clipboard.writeText(TranslatedText.value);
    alert("Copied the text: " +TranslatedText.value);
  }
}
})

Switch.addEventListener('click',()=>{
  let tempText = myText.value ;
  myText.value = TranslatedText.value ; 
  TranslatedText.value = tempText ; 
  let temp ; 
  temp = selectTag[0].value 
  selectTag[0].value = selectTag[1].value ; 
  selectTag[1].value = temp; 
}) 
selectTag.forEach((tag , id)=> { 
    for (const country_code in countries) { 
        let select = "" ; 
        if (id == 0 && country_code == "en-GB") {       
        select = "selected" ;  
        }
        else if (id == 1 && country_code == "ar-SA") {
            select = "selected" ; 
        }
       let option =  `<option ${select} value="${country_code}">${countries[country_code]}</option>`;
       tag.insertAdjacentHTML("beforeend",option);
    }
}) ; 
translateBtn.addEventListener('click' , ()=> { 
  let text = myText.value , TranslateFrom = selectTag[0].value , translateTo = selectTag[1].value ; 
  let apiUrl  = `https://api.mymemory.translated.net/get?q=${text}&langpair=${TranslateFrom}|${translateTo}`; 
  fetch(apiUrl).then(res => res.json()).then(data => {
    TranslatedText.value = data.responseData.translatedText ; 
  })
})