import { render } from 'react-dom';
import App from './App';

window.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.querySelector('#root')
  );
});
