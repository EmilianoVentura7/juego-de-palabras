import React, { useState } from 'react';
import './Wordle.css';

const PALABRAS = ['raton', 'llave', 'silla', 'pared', 'limon', 'melon', 'perro', 'salud', 'lugar', 'noche'];

function Wordle() {
  const [palabras, setPalabras] = useState(PALABRAS);
  const [indicePalabraActual, setIndicePalabraActual] = useState(0);
  const [intentos, setIntentos] = useState(Array(5).fill(''));
  const [intentosRestantes, setIntentosRestantes] = useState(Array(5).fill(4));
  const [numCorrectas, setNumCorrectas] = useState(0);
  const [puedeAdivinar, setPuedeAdivinar] = useState(true);

  const manejarCambioIntento = (indice, evento) => {
    if (puedeAdivinar) {
      const nuevosIntentos = [...intentos];
      nuevosIntentos[indice] = evento.target.value;
      setIntentos(nuevosIntentos);
    }
  };

  const manejarEnvioIntento = () => {
    const palabraActual = palabras[indicePalabraActual];
    const nuevosIntentosRestantes = [...intentosRestantes];
    let todasCorrectas = true;
    intentos.forEach((intento, indice) => {
      if (intento === palabraActual[indice]) {
        nuevosIntentosRestantes[indice] = intentosRestantes[indice];
      } else {
        nuevosIntentosRestantes[indice] -= 1;
        todasCorrectas = false;
        setPuedeAdivinar(false);
      }
    });
    setIntentosRestantes(nuevosIntentosRestantes);
    if (todasCorrectas) {
      if (indicePalabraActual === 9) {
        alert('¡Ganaste!');
      } else {
        setIndicePalabraActual(indicePalabraActual + 1);
        setIntentos(Array(5).fill(''));
        setIntentosRestantes(Array(5).fill(4));
        setNumCorrectas(numCorrectas + 1);
        setPuedeAdivinar(true);
      }
    }
  };

  const manejarReinicio = () => {
    setIndicePalabraActual(0);
    setIntentos(Array(5).fill(''));
    setIntentosRestantes(Array(5).fill(4));
    setNumCorrectas(0);
    setPuedeAdivinar(true);
  };

  const manejarLimpiar = () => {
    setIntentos(Array(5).fill(''));
  };

  const palabraActual = palabras[indicePalabraActual];

  return (
    <div className="game-card">
      <div className="game-title">Wordle</div>
      <div className="game-info">
        Adivina la palabra de 5 letras. Tienes 4 intentos para adivinar cada letra. ¡Buena suerte!
      </div>
      <div className="word-container">
        {palabraActual.split('').map((letra, indice) => (
          <div key={indice} className="letter-container">
            <input type="text" maxLength="1" value={intentos[indice]} onChange={(evento) => manejarCambioIntento(indice, evento)} disabled={!puedeAdivinar} />
            <div className={`attempts attempts-${intentosRestantes[indice]}`}></div>
          </div>
        ))}
      </div>
      <div className="game-footer">
        <button onClick={manejarEnvioIntento}>Enviar</button>
        <div className="progress-bar">
          {Array(10).fill().map((_, indice) => (
            <div key={indice} className={`progress-dot ${indice < numCorrectas ? 'progress-dot-correct' : ''} ${indice === indicePalabraActual ? 'progress-dot-current' : ''}`}></div>
          ))}
        </div>
        <div className="game-buttons">
          <button onClick={manejarReinicio}>Reiniciar</button>
          <button onClick={manejarLimpiar}>Limpiar</button>
        </div>
      </div>
    </div>
  );
}

export default Wordle;