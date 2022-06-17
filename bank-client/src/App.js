import './App.css';
import HomeLayout from './component/layout/HomeLayout';
import Transaction from './component/pages/Transaction';
import { BankProvider } from './context/bankContext';

function App() {
  return (
    <BankProvider>
      <HomeLayout>
        <Transaction />
      </HomeLayout>
    </BankProvider>
  );
}

export default App;
