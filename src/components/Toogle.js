import React from 'react';
import Switch from '@mui/material/Switch';

export default function Toogle({ isTicTacToe, onToggle }) {
  return (
    <div>
      <Switch
        checked={isTicTacToe}
        onChange={onToggle}
        style={{ color: '#5bc0de' }}
        color="primary"
      />
      <span>{isTicTacToe ? "Tic-Tac-Toe" : "Puissance 4"}</span>
    </div>
  );
}
