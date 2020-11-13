import './App.css';
import GlobalMsg from './components/GlobalMsg/GlobalMsg'
import React, {useRef} from 'react'

function App() {
  
  const content = 'hello world'
  const duration = 5000

  const globalMsgRef = useRef(null)

  const showMsg = () => {
    console.log(globalMsgRef)
    globalMsgRef.current.showMsg(true)
  }

  return (
    <div className="App">
      <button onClick={showMsg}></button>
      <GlobalMsg ref={globalMsgRef} msg={content} duration={duration} />
    </div>
  );
}

export default App;
