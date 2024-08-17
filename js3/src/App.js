import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Stack, Button } from 'react-bootstrap';
import Cards from './components/Cards';
import AddBudget from './components/AddBudget';

function App() {
  const [showAddBudget, setShowAddBudget] = useState(false)
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className='me-auto'>Budget</h1>
          <Button variant="warning" onClick={() => setShowAddBudget(true)}>Add Budget</Button>
          <Button variant="primary">Add Expense</Button>
        </Stack>
        <div className='Cards'>
          <Cards name="Entertainment" gray amount={1000} max={1500} ></Cards>
        </div>
      </Container>
      <AddBudget show={true} handleClose={() => {
        setShowAddBudget(false)
      }} />
    </>
  );
}

export default App;
