import React from 'react';
import { getVerseOfDay } from '../data/verses';

const Versiculos: React.FC = () => {
  const verse = getVerseOfDay();

  return (
    <div>
      <h1>Versículo do Dia</h1>
      <p><strong>{verse.reference}</strong></p>
      <p>{verse.text}</p>
    </div>
  );
};

export default Versiculos;
