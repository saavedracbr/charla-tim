import { createRoot } from 'react-dom/client';
import '../styles/base.css';
import './deck.css';
import { Deck } from './Deck';

createRoot(document.getElementById('root')!).render(<Deck />);
