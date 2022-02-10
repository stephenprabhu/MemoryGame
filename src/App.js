import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import spaceImageArray from './resources/spaceImages';
import beachImageArray from './resources/summerImages';
import kitchenImageArray from './resources/kitchenImages';
import pirateImageArray from './resources/pirateImages';

let cardImages = [];
let imageSize = 0;

function App() {
  const [cards, setCards]= useState([]);
  const [turns, setTurns]= useState(0);
  const [choiceOne, setChoiceOne]=useState(null);
  const [choiceTwo, setChoiceTwo]=useState(null);
  const [disabled, setDisabled]= useState(false);
  const [startFlip, setStartFlip]= useState(false);
  const [difficulty, setDifficulty]=useState(4);
  const [theme, setTheme]=useState("beach");


  //COMPARE 2 SELECTED CARDS
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceTwo.src === choiceOne.src){
        setCards(prevCards =>{
          return prevCards.map(card => {
            if(card.src === choiceTwo.src){
              return {...card, matched:true}
            }else{
              return card;
            }
          })
        });
        resetTurn();
      }else{
        setTimeout(()=>resetTurn(), 1000);
      }
    }

  },[choiceOne,choiceTwo]);


  useEffect(()=>{
    createCardImageArray();
    shuffleCards();
  },[]);

  // suffle cards
  const shuffleCards =() =>{
    createCardImageArray();
    imageSize=difficulty;
    const shuffledCardArray = [...cardImages,...cardImages]
      .sort(()=> Math.random()-0.5 )
      .map((card)=> ({...card, id: Math.random()}));

      setChoiceOne(null);
      setChoiceTwo(null);

      setCards(shuffledCardArray);
      setTurns(0);
      flipForOneSecond();
  }

  //handle choice
  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  } 

  const resetTurn =() =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns+1);
    setDisabled(false);
  }

  const flipForOneSecond=()=>{
    setStartFlip(true);
    setTimeout(()=>{
      setStartFlip(false);
    },1000);
  }

  const themeSelectChangeHandler=(event)=>{
    setTheme(event.target.value);
  }

  const createCardImageArray=()=>{
    switch(theme){
      case "beach":
        cardImages = beachImageArray.slice(0,difficulty);
        break;
      case "kitchen":
        cardImages= kitchenImageArray.slice(0,difficulty);
        break;
      case "space":
        cardImages = spaceImageArray.slice(0,difficulty);
        break;
      case "pirates":
        cardImages = pirateImageArray.slice(0,difficulty);
        break;
      default:
        cardImages = spaceImageArray.slice(0,difficulty);
        break;
    }
  }

  const difficultySelectChangeHandler=(event)=>{
    switch(event.target.value){
      case "easy":
        setDifficulty(4);
        break;
      case "medium":
        setDifficulty(6);
        break;
      case "hard":
        setDifficulty(8);
        break;
      default:
        setDifficulty(4);
        break;
    }
  }

  return (
    <div className="App">
      <div className='menu'>
        <div>
          <h1>Memory Match</h1>
          <button onClick={shuffleCards}>New Game</button><br/>
          <p>Turns: {turns}</p>
        </div>
         <div className='options'>
          <div>
            <h4>Theme: </h4>
            <select onChange={themeSelectChangeHandler}>
              <option value="beach">Beach</option>
              <option value="kitchen">Kitchen</option>
              <option value="space">Space</option>
              <option value="pirates">Pirates</option>
            </select>
          </div>
           <div>
            <h4>Difficulty: </h4>
              <select onChange={difficultySelectChangeHandler}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
           </div>
         </div>
      </div>

      <div className='cards card-grid'>
        {cards.map(card=>(
          <SingleCard 
              card={card} 
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched || startFlip}
              disabled={disabled}
              difficulty={imageSize} />
        ))}
      </div>
    </div>
  );
}

export default App