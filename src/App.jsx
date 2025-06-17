
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import RentalWebsite from './Components/RentalWebsite.jsx';
//import img from "./assets/images"

const App = () => {
  return (

      <Router>
        <Routes>
         <Route path="/" element={<RentalWebsite />} />
        </Routes>
      </Router>

  );
};



export default App;