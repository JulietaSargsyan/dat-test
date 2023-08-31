import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';


export type PluginOptions = {
  selector: string;
  initializedOptions: string[];
  onPositionChange(positions: string[]): void;
  onComplete(positions: string[]): void;
  onInit(): void;
};

if (import.meta.env.MODE === 'development') {
  const renderElement = document.getElementById('root');
  createRoot(renderElement as HTMLElement).render(
    <App
      options={{
        selector: '#root', 
        initializedOptions: ['A1', 'C2', 'B4', 'A2'], // array of active positions
        onPositionChange(positions) {
          // called when positions change and returns an array of active positions
          console.log(positions);
        },
        onComplete(positions) {
          console.log(positions);
          
        }, // called when events are confirmed
        onInit() {} //
      }}
    />
  );
} else {
  window.DAMAGE_SELECTOR_API = {
    init: (options: PluginOptions) => {
      const { selector } = options;
      if (selector) {
        const renderElement = document.querySelector(selector);
        if (renderElement) {
          createRoot(renderElement as HTMLElement).render(
            // <ErrorBoundary>
              <App options={options} />
            // </ErrorBoundary>
          );
        }
      }
    }
  };
}
