import styles from "./SingleCard.module.css";
const SingleCard = ({ card, handleChoice, flipped, disabled, difficulty }) => {

    const handleClick=()=>{
        if(!disabled){
            handleChoice(card);
        }
    }
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped:""}>
        <img className={`${styles.front} ${difficulty===8 ? styles.hard:''}`} src={card.src} alt="card front" />
        <img
          className={`${styles.back} ${difficulty===8 ? styles.hard:''}`}
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;

