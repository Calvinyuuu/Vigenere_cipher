import { Navbar, Encoder, Decoder, Hero } from './components';

function App() {

  return (
    <div className="flex flex-col border rounded-lg shadow-lg p-6 w-96">
      <Navbar />
      <Hero />
      <Encoder />
      <Decoder />
    </div>
  )
}

export default App
