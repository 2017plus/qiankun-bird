import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <div style={{ display: 'flex', flexDirection: 'row',height:'100%' }}>
        <div style={{backgroundColor:'darkseagreen',padding:20}}>
          <ul>
            <li><a href='/react'>菜单1</a></li>
            <li><a href='/vue'>菜单2</a></li>
            <li><a href='/static'>菜单3</a></li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            backgroundColor:'pink',padding:20
          }}>
            <BrowserRouter basename=''>
            <Link to="/react">React子应用</Link>
            <Link  style={{ margin: 30 }} to="/vue">Vue子应用</Link>
            <Link to="/static">静态应用</Link>
          </BrowserRouter>
          </div>



          <div id='container' />
        </div>

      </div>
  );
}

export default App;
