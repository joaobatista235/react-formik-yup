import { RegisterForm } from './components/RegisterForm/RegisterForm';

import './index.css';
import type { RegisterFormData } from './types/RegisterForm';

function App() {
  const handleSubmit = async (values: RegisterFormData) => {
    console.log('Dados submetidos:', values);
  };
  
  return (
    <main className="app">
      <RegisterForm onSubmit={handleSubmit} />
    </main>
  );
}

export default App;