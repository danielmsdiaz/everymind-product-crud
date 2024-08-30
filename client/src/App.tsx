import Table from './components/Table'
import { MessageProvider } from './context/MessageContext'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <MessageProvider>
      <Navbar/>
      <Table/>
    </MessageProvider>
  )
}

export default App