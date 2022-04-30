import { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [meme, setMeme] = useState('fire');

  const handleChangeLine1 = ({ target }) => setLine1(target?.value || '');

  const handleChangeLine2 = ({ target }) => setLine2(target?.value || '');

  const handleChangeMeme = ({ target }) => setMeme(target?.value || '');

  const handleClickExport = () => {
    if (!line1 && !line2) {
      alert('Disculpe, pero debe indicar un mensaje para el meme');
      return;
    }

    html2canvas(document.querySelector("#meme")).then(canvas => {
      const link = document.createElement('a');
      link.download = `${meme}.jpg`;
      link.href = canvas.toDataURL("image/jpg");
      link.click();

      // reset params
      setMeme('fire');
      setLine1('');
      setLine2('');
    });
  }

  return (
    <div className="App">
      <h1>Generador de memes</h1>

      <div className="select-box">
        <select name="select" id="select" onChange={handleChangeMeme} value={meme || ''}>
          <option value="fire">Niña y casa en llamas</option>
          <option value="futurama">Futurama</option>
          <option value="history">History</option>
          <option value="matrix">Matrix</option>
          <option value="philosoraptor">Philosoraptor</option>
          <option value="smart">Inteligente</option>
        </select>
      </div>
      <div className='input-zone'>
        <textarea
          type="text"
          placeholder="Texto superior"
          onChange={handleChangeLine1}
          value={line1 || ''}
          maxLength={100}
          rows={4}
        />
        <textarea
          type="text"
          placeholder="Texto inferior"
          onChange={handleChangeLine2}
          value={line2 || ''}
          maxLength={100}
          rows={4}
        />
      </div>
        <button
          className="btn-export"
          onClick={handleClickExport}
        >
          Exportar
        </button>

      <div className="meme" id="meme">
        <span>{line1}</span>
        <span>{line2}</span>
        <img src={`/imgs/${meme}.jpg`} alt={meme || 'empty'} />
      </div>

    </div>
  )
}

export default App
