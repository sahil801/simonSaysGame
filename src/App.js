import './App.css';
import ColorCard from './components/ColorCard';
import {useEffect, useState} from 'react';
import './style/index.scss'
import ScoreCard from './components/ScoreCard';

function App() {
  const [isOn,setIsOn] = useState(false);
  const colorList = ["green","red","blue","yellow"];
  const initalState = {
    isDisplay : false,
    colors :[],
    score : 0,
    userPlay : false ,
    userColor : []
  }

  const [play , setPlay] = useState(initalState);
  const [flashColor , setFlashColor] = useState('');

  const suffule = (array) =>{
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleStart = () => {
    setIsOn(true);
  }

  const timeOut = (ms) =>{
    return new Promise(resolve=>setTimeout(resolve,ms));
  }

  const displayColors = async () =>{
    await timeOut(500);
    for(let i=0;i<play.colors.length;i++){
      setFlashColor(play.colors[i]);
      await timeOut(500);
      setFlashColor('');
      // await timeOut(500);
      if(i === play.colors.length-1){
        const copyColors = [...play.colors];
        setPlay({
          ...play,
          isDisplay:false,
          userPlay : true,
          userColor : copyColors.reverse(),
        });
      }
    }
  }

  const handleCardClick = async (v)=>{
    if(!play.isDisplay && play.userPlay){
      let copyUserColors = [...play.userColor];
      let lastColor = copyUserColors.pop();
      console.log(v);
      setFlashColor(v);
      if(lastColor===v){
        if(copyUserColors.length){
          setPlay({...play,'userColor':copyUserColors})
        }else{
          setPlay({...play, 'isDisplay':true,'userPlay':false, 'score':play.colors.length,'userColor':[]})
        }
      }else{
        // await timeOut(1000);
        setPlay({...initalState,'score':play.colors.length});
      }
      await timeOut(300);
      setFlashColor('')
    }
  }

  useEffect(()=>{
    if(isOn){
      setPlay({...initalState , isDisplay:true});
    }else{
      setPlay(initalState);
    }
  },[isOn]);

  useEffect(()=>{
    if(isOn&&play.isDisplay){
      let randomIndex = Math.floor(Math.random()*4);
      let newColor = colorList[randomIndex];
      let copyColors = [...play.colors];
      copyColors.push(newColor);
      let newColorsArr = suffule(copyColors);
      setPlay({...play,'colors' :newColorsArr})
    }
  },[isOn,play.isDisplay]);

  useEffect(()=>{
    if(isOn&&play.isDisplay&&play.colors.length){
      displayColors();
    }
  },[isOn,play.isDisplay ,play.colors.length])

  const handleClose = ()=>{
    setIsOn(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="cardWrapper">
          {colorList && colorList.map((c,index)=> <ColorCard onClick={()=>{handleCardClick(c)}} key={index} color={c} flash={flashColor===c} />)}
        </div>
        {isOn && !play.isDisplay && !play.userPlay && play.score && (
          <div className="Finish">
            <div>Score: {play.score}</div>
            <button onClick={handleClose} className="closeButton">Close</button>
          </div>
        )}
        {(!isOn) && (!initalState.score) && (<button className= "startBtn" onClick={handleStart}>Start</button>)}
        {/* <button className= "startBtn" onClick={handleStart}>Start</button> */}
        {isOn && (play.isDisplay || play.userPlay)&&(
          <ScoreCard play={play} />
        )}
      </header>
    </div>
  );
}

export default App;
