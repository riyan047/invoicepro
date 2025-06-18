import { Hero } from './components/hero';
import { Navbar } from './components/navbar';
import './globals.css';

export default function Home() {
  return (
    <main className='max-w-7xl mx-auto sm:px-6 lg:px-8 '>
      <Navbar />
      <Hero />
    </main>
  )
}
