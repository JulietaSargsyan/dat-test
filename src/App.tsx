import React, { useEffect } from 'react';
import carImg from '/car-img.png';
import { createEffect, createStore, createEvent } from 'effector';
import { PluginOptions } from './main';

const $positions = createStore<string[]>([]);

const posAdded = createEvent<string>();
const posRemoved = createEvent<string>();

$positions.on(posAdded, (positions, position) => [...positions, position]);
$positions.on(posRemoved, (positions, positionToRemove) => {
  return positions.filter(position => position !== positionToRemove);
});

const fetchPositionsFx = createEffect<void, string[]>(async () => {
  const response = await fetch('https://myfailemtions.npkn.net/b944ff/');
  return response.json();
});

fetchPositionsFx.done.watch(({ result }) => {
  console.log('Fetched positions:', result);
  $positions.reset([]);
  result.forEach(position => {
    if (!$positions.getState().includes(position)) {
      posAdded(position);
    }
    const span = document.querySelector(`span[data-position="${position}"]`);
    if (span) {
      span.classList.add('active');
    }
  });
});

const App: React.FC<{ options: PluginOptions }> = ({ options }) => {
  const { initializedOptions, onPositionChange, onComplete, onInit } = options;

  useEffect(() => {
    initializedOptions.forEach((option: string) => posAdded(option));
    fetchPositionsFx();
    onInit();
  }, []);

  function postPositions() {
    const activePositions = $positions.getState();

    fetch('https://myfailemtions.npkn.net/b944ff/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activePositions),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent successfully:', data);
        onComplete(activePositions);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }

  function handleSpanClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
  
    if (target.tagName === 'SPAN' && !target.classList.contains('active')) {
      target.classList.add('active');
      const position = target.getAttribute('data-position')!;
      posAdded(position);
      onPositionChange($positions.getState());
    } else if (target.tagName === 'SPAN' && target.classList.contains('active')) {
      target.classList.remove('active');
      const position = target.getAttribute('data-position')!;
      posRemoved(position);
      onPositionChange($positions.getState());
    }
  }
  

  return (
    <div className='container'>
         <div className='dot-wrapper' onClick={handleSpanClick}>
             <div className='a_dots dot'>
                 <span data-position='A1'></span>
                 <span data-position='A2'></span>
                 <span data-position='A3'></span>
                 <span data-position='A4'></span>
             </div>
             <div className='b_dots dot'>
                 <span data-position='B1'></span>
                 <span data-position='B2'></span>
                 <span data-position='B3'></span>
                 <span data-position='B4'></span>
                 <span data-position='B5'></span>
             </div>
             <div className='c_dots dot'>
                 <span data-position='C1'></span>
                 <span data-position='C2'></span>
                 <span data-position='C3'></span>
                 <span data-position='C4'></span>
             </div>
             <img src={carImg} alt="car image" />
         </div>
         <button className='button' onClick={postPositions}>Rapporto danni</button>
     </div>
  );
};

export default App;
