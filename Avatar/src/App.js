import './App.css';
import { useCallback, useEffect, useState } from 'react';
import Rock from './components/Rock';
import CurrentScore from './components/CurrentScore';
import Earth from './components/Earth';
import Water from './components/Water';
import Air from './components/Air';
import Fire from './components/Fire';

function App() {

  const [listOfRocks, setNumOfRocks] = useState({});
  const [rocksArr, setRockObjects] = useState([]);

  var rockName = "rockSet1";

  const updateRocks = useCallback((newRock) => {
    let oldRocks = rocksArr.length;
    if (oldRocks < newRock) {
      for (let i = oldRocks; i < newRock; i++) {
        rocksArr.push(rocksArr.length);
      }
    } else if (oldRocks > newRock) {
      for (let i = newRock; i < oldRocks; i++) {
        rocksArr.pop();
      }
    }
    setRockObjects([...rocksArr]);
  }, [rocksArr]);

  const onScoreChange = useCallback((rockName, rock) => {
    setNumOfRocks({...listOfRocks, [rockName]: rock});
    updateRocks(rock);
  }, [listOfRocks, updateRocks]);

  const updateDocumentTitle = useCallback((listOfRocks) => {
    document.title = `The Current Number of Rocks: ${listOfRocks[rockName] ?? 0}`;
  }, [rockName]);

  useEffect(() => {
    updateDocumentTitle(listOfRocks);
  }, [listOfRocks, updateDocumentTitle]);

  return (
    <div className="App">

      <div className="FourElements">
        
        <Earth 
          numOfRocks={listOfRocks[rockName] ?? 0}
          rockName={rockName}
          onScoreChange={onScoreChange} 
        />

        <Water 
          numOfRocks={listOfRocks[rockName] ?? 0}
          rockName={rockName}
          onScoreChange={onScoreChange} 
        />

        <Air 
          numOfRocks={listOfRocks[rockName] ?? 0}
          rockName={rockName}
          onScoreChange={onScoreChange} 
        />

        <Fire
          numOfRocks={listOfRocks[rockName] ?? 0}
          rockName={rockName}
          onScoreChange={onScoreChange} 
        />

      </div>

      <div className="CurrentRocks">
        <CurrentScore 
          key = {listOfRocks}
          numOfRocks={listOfRocks[rockName] ?? 0}
        />
      </div>


      <div className="Rocks" id="AllTheRocks">
        {rocksArr.map((i) => (
          <Rock key={i}/>
        ))}
      </div>

    </div>
  );
}

export default App;
