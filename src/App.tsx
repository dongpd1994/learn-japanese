import { Card } from 'reactstrap';
import './App.scss';
import Home from './home';

const paddingTop = '10px';
function App() {
  return (
    <div className="app-container" style={{ paddingTop }}>
      <div className="container-fluid view-container" id="app-view-container">
        <Card className="jh-card"><div className="view-routes"><Home /></div></Card> </div>
    </div>
  );
}

export default App;
