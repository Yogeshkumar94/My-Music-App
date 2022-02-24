console.log("Welcome to a music App by Yogesh Kumar");
var numberofsongs = 5;
var repeat = 0;
let songIndex = 1;
let audioElement = new Audio("1.mp3");
let masterplay = document.getElementById("masterplay");
let progbar = document.getElementById("progbar");
let prevsong = document.getElementById("prevsong");
let nextsong = document.getElementById("nextsong");
let repeatsong = document.getElementById("repeatsong");
let masterplaysong = document.getElementById("masterplaysong");
let song = Array.from(document.getElementsByClassName("song"));
let nowplaying = document.getElementById("nowplaying");
let bannerpic = document.getElementById("bannerpic");
let crnttime = document.getElementById("crnttime");
let fill = document.getElementsByClassName("fill");
let songs=[
    {songName:"Jim-Yosef-Lights", filepath:"1.mp3", coverpath:"1.jpg"},
    {songName:"Tobu-Sound-of-Goodbye", filepath:"2.mp3", coverpath:"2.jpg"},
    {songName:"Jim-Yosef-Arrow", filepath:"3.mp3", coverpath:"3.jpg"},
    {songName:"Jim-Yosef-Firefly", filepath:"4.mp3", coverpath:"4.jpg"},
    {songName:"Unison-Aperture", filepath:"5.mp3", coverpath:"5.jpg"}
]
song.forEach((element,i) => {
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    let x = new Audio(songs[i].filepath);
   // element.getElementsByClassName("songduration")[0].innerText = toString(x.duration);
   x.onloadedmetadata = function() {
    let y = this.duration;
    console.log(this.duration);
    let minutes = Math.floor(parseInt(y)/60);
    let seconds = parseInt(y)%60;    
    if(seconds==0){
        seconds = '00';
    }
    else if(seconds<10){
        seconds= '0'+seconds;
    }
    //console.log(minutes);
    //console.log(seconds);
    element.getElementsByClassName("songduration")[0].innerText = minutes + ":" + seconds;
   };
});
masterplay.addEventListener('click',()=>{
    if(audioElement.paused){
        audioElement.play();
        document.getElementById("masterplay").src="pause.png";
        gif.style.opacity = 1;
    }
    else if(audioElement.played){
        audioElement.pause();
        document.getElementById("masterplay").src="pause-play.png";
        gif.style.opacity = 0;
        makeallplays();
    }
})
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate')
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*300);
    //console.log(progress)
    progbar.value = progress;

})
progbar.addEventListener('change',()=>{
    audioElement.currentTime = progbar.value*audioElement.duration/300;
    let per = parseFloat(progbar.value/3)
  //  fill.style.width = parseFloat("50") ;
    console.log(typeof(per+"%"));
    console.log(typeof(50));
})
prevsong.addEventListener('click',()=>{
    if(progbar.value >=2){
        audioElement.currentTime = 0;
    }
    else if (progbar.value>=0){
        if(songIndex<1){
            songIndex= numberofsongs;
        }
        else{
            songIndex -= 1;
        }
    }
    masterplaysong.innerText = songs[songIndex-1].songName;
    nowplaying.innerText = songs[songIndex-1].songName;
    bannerpic.src = songs[songIndex-1].coverpath;
    audioElement.src = songIndex + ".mp3";
    audioElement.currentTime = 0;
    masterplay.click();
})
nextsong.addEventListener('click',()=>{
    if(songIndex>numberofsongs){
        songIndex = 1;
    }
    else{
        songIndex+=1;
    }
    masterplaysong.innerText = songs[songIndex-1].songName;
    nowplaying.innerText = songs[songIndex-1].songName;
    bannerpic.src = songs[songIndex-1].coverpath;
    audioElement.src = songIndex + ".mp3";
    audioElement.currentTime = 0;

    masterplay.click();
})
const makeallplays = ()=>{
    Array.from(document.getElementsByClassName("playpause")).forEach((element)=>{
            element.src = "circle-play-regular.svg";
            
        })
}
Array.from(document.getElementsByClassName("playpause")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        
        
        
        //if(e.target.src === "circle-play-regular.svg"){
            makeallplays();
            e.target.src = "circle-pause-regular.svg";
            songIndex = parseInt(e.target.id);
            audioElement.src = songIndex + ".mp3";
            audioElement.currentTime = 0;
            masterplay.click();
            masterplaysong.innerText = songs[songIndex-1].songName;
            
            nowplaying.innerText = songs[songIndex-1].songName;
            bannerpic.src = songs[songIndex-1].coverpath;
        //}
        
    })
})
repeatsong.addEventListener('click',()=>{
    if(repeat==0){
        //change icon to repeat one
        repeatsong.src = "repeatone.png";
        repeatsong.style.opacity = 1;
        repeat +=1;
    }
    else if(repeat==1){
        //change icon to repeat all
        repeatsong.src = "repeatall.png";
        repeatsong.style.opacity = 1
        repeat +=1;
    }
    else if(repeat==2){
        //change iconto no repeat
        repeatsong.src = "repeatno.png";
        repeatsong.style.opacity = 0.5;
        repeat=0;
    }
    
})


audioElement.addEventListener('ended',()=>{
    if(repeat==1){
        audioElement.play();
    }
    else if(repeat==2){
        songIndex+=1;
        audioElement.src = songIndex + ".mp3";
        masterplay.click();
        masterplaysong.innerText = songs[songIndex-1].songName;
            
        nowplaying.innerText = songs[songIndex-1].songName;
        bannerpic.src = songs[songIndex-1].coverpath;
    }
})


setInterval(function(){
    let currtime = audioElement.currentTime;
    let mins = Math.floor(parseInt(currtime)/60);
    let secs = parseInt(currtime)%60;    
   
    mins = parseInt(mins);
    secs = parseInt(secs);
   // console.log(mins);
   //  console.log(secs);
    if(secs<10){
    crnttime.innerText = mins + ":0" + secs;
    }
    else{
        crnttime.innerText = mins + ":" + secs;
    }

},1000);
