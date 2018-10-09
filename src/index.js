import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Navigator } from 'react-onsenui';
import { store } from './store'
import { RenderPage } from './routes';
import registerServiceWorker from './registerServiceWorker';
import './css/index.css'
import './css/magic.css'

ReactDOM.render(
  <Provider store={store}>
    <Provider store={store}>
      <Navigator
        swipeable
        renderPage={RenderPage}
        initialRoute={{
          title: 'welcome',
          hasBackButton: false
        }}
        animation='slide'
        animationOptions={{
          duration: 0.3
        }}
      />
    </Provider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
