
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import DataTableWrapper from './components/DataTableWrapper';

function App() {
  return (
    <PrimeReactProvider>
      <div className="app-container">
        <DataTableWrapper />
      </div>
    </PrimeReactProvider>
  );
}

export default App;