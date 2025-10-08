import { Button } from './components/ui/button'
import Footer from './Footer'
import Header from './Header'

function App() {

  return (
    <>
      <Header></Header>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="outline">Button</Button>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
