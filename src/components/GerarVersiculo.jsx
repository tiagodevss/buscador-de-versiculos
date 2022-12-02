import React from 'react';
import './GerarVersiculo.css';

export default function GerarVersiculo(props) {
    return (
        <div className='versiculo'>
            <p>{props.versiculosCapitulo[props.numeroVersiculoSelecionado - 1]}</p>
        </div>
    )
}