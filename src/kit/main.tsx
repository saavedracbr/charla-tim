import { createRoot } from 'react-dom/client';
import '../styles/base.css';
import './kit.css';
import { Kit } from './Kit';

createRoot(document.getElementById('root')!).render(<Kit />);
