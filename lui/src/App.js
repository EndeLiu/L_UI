import './App.css';
import SideMenu from './components/SideMenu/SideMenu'
import React, {useRef} from 'react'

function App() {
  
  const data = [
    {
      name: '1', children:[
        {
          name: '1-1', children:[
            {name: '1-1-1', children:[]},
            {name: '1-1-2', children:[]},
            {name: '1-1-3', children:[]}
          ]
        },
        {
          name: '1-2', children:[]
        },
        {
          name: '1-3', children:[]
        },
        {
          name: '1-4', children:[]
        },
      ]
    },
    {
      name: '2', children:[
        {name: '1-4', children:[]},
      ]
    },
  ]

  return (
    <div className="App">
      <SideMenu data={data} width={150} />
    </div>
  );
}

export default App;
