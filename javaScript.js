let word
let chosen=[]
let index = 0,wrongIndex=0
let vocabulary1=['שולחן','כסא','תמונה','מחשב','חופש','לימודים','הצלחה','מכונית','ספר','יונים','מנדלה','אנגליה','צמר גפן','פיל','תבנית','ציפורים','קלפים','בית ספר','חורים','עגבנית שרי','לבבות','קרקר','בית כנסת','שמן זית','מיץ לימון','שעורי בית']
let vocabulary2=['dissapointed','comprehension','important','calculator']
let audio=new Audio('assets/background.mp3')
let audio2=new Audio('assets/win.wav')
let audio3=new Audio('assets/end.mp3')
let twoOords=false


const startOne=()=>
{
    document.body.getElementsByTagName('div')[1].style.display='none'
    document.body.getElementsByTagName('div')[2].style.display='none'
    let ran=parseInt(Math.random()*vocabulary1.length-1)
        word=vocabulary1[ran]
        start()
}

const startTwo=()=>
{
    document.body.getElementsByTagName('div')[1].style.display='none'
    document.body.getElementsByTagName('div')[2].style.display='none'
    document.body.innerHTML+='<label>נא לבחור מילה:<label>'
    let inp=document.createElement('input')
    inp.className='myInput'
    inp.addEventListener('blur',start1,window.event)
    document.body.appendChild(inp)    
}

const start1=(event)=>{
    document.getElementsByTagName('label')[0].style.display='none'
    document.getElementsByTagName('input')[0].style.display='none'
    word=event.target.value
    start()
}

const start=()=>
{    
    console.log(word)
    document.getElementsByClassName('progress')[0].style.display='inline-block'  
    audio.play()
    let allDives=document.getElementById('allDives')   
    for (let i=0;i< word.length;i++)
    {
        let squ=document.createElement('div')
        squ.className='options'
        squ.innerText='.' 
        if(word[i]==' ')
        {
        squ.style.visibility='hidden'   
        twoOords=true
        }
        allDives.appendChild(squ)
        
    }   
    document.body.innerHTML+='<hr>'
    let inp=document.createElement('input')   
    inp.id = 'selectLetters'
    inp.maxLength='1'
    inp.autocomplete="off"
    inp.className='myInput'
    inp.addEventListener('keyup',function(){gues(this)})
    let lab=document.createElement('label')
    lab.for='inp'
    lab.innerText='נסו לנחש את המילה שנבחרה...'
    lab.style.backgroundColor='rgb(154, 29, 226)'
    lab.style.padding='10px'
    lab.style.borderRadius='25%'
    document.body.appendChild(lab)
    document.body.innerHTML+='<br>'
    document.body.appendChild(inp)    
    let letters=document.createElement('div')
    letters.className='letters'
    document.body.appendChild(letters)
}

const gues=(elem)=>
{
    let opts=document.getElementsByClassName('options')  
    let flag=false     
    for(let i = 0 ;  i< word.length; i++)
    {
        if(word[i]==elem.value)
        {
            if(opts[i].innerHTML!=elem.value)
            {
                opts[i].innerHTML=elem.value
                opts[i].style.color='black'
                flag=true
                index++
            }
            else flag=true
        }
    }
        if(!flag)
        {        
        let choos=document.createElement('div')
        choos.id='choose'
        choos.innerText=elem.value  
        document.body.appendChild(choos)        
        myBar.style.width=wrongIndex+10
        wrongIndex+=10
        moveProgressBar(wrongIndex)
        if(wrongIndex==100)
        gameOver()
        }   
    elem.value=""
    if(index==word.length || index==word.length-1 && twoOords==true)//התנאי השני בודק אם יש 2 מילים ולכן המשתמש לא ינחש את המיקום של הרווח
        gameOver1() 
}
const gameOver=()=>
{  
     audio.volume=0
     audio3.play() 
     document.body.innerHTML='<div id="failed">אולי בפעם אחרת...</div>'
     document.body.innerHTML+=`<div id="failed1">המילה היא: ${word}</div>`
     document.body.innerHTML+=' <input id="reloa" class="btn btn-dark" value="משחק חדש" type="button" onclick="reloa()">'
}
const gameOver1=()=>
{
    audio.volume=0  
    audio2.play()    
    
    document.body.innerHTML='<div id="won">נצחת!</div>'
    document.body.innerHTML+=`<div id="failed1">המילה היא: ${word}</div>`
    document.body.innerHTML+=' <input class="btn btn-dark" id="reloa" value="משחק חדש" type="button" onclick="reloa()" >'
}

const moveProgressBar=(num)=>
 {
    let elem = document.getElementById("myBar");   
    let width = num-10;
    let id = setInterval(frame,10);
    function frame()
     {
      if (width >=num) {
        clearInterval(id);
      } 
      else {
        width++; 
        elem.style.width = width + '%';
      }
    }   
  }

  const reloa=()=>
  {
      window.location.reload()
  }




