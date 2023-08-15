import './entry.css'
const Entry = () => {
    return (
      <div className='entry--div'>
        <h1>chatDeFudgeApp</h1>
        <div>
          <p>Vad ar ditt namn, beach?</p>
          <input className='user--input' type="text" placeholder='du maste ha ett namn' />
        </div>
        <button className='enter--btn'>Gor din entre</button>
      </div>
    )
  }
  
  export default Entry