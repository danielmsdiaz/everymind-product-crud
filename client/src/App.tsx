import Table from './components/Table'
import { MessageProvider } from './context/MessageContext'

const App = () => {
  return (
    <MessageProvider>
      <Table/>
    </MessageProvider>
  )
}

export default App