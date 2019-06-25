import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import './index.css';
import './snackbar.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const pwaPrompt = {
    hasPrompt : () => window.localStorage.getItem('hasPrompt'),
    setPrompt : yesOrNo => {
        window.localStorage.setItem('hasPrompt', yesOrNo) 
        window.location.reload(true) 
    },
    onUpdate: (reg) => {
        const onUpdateElement = document.createElement('div')
        render(
            <>
            <PromptPWA visible={true} updated={true} handleClick={e => { unmountComponentAtNode(onUpdateElement) }}/>
            </>, onUpdateElement)
        document.body.appendChild(onUpdateElement)
    }
}
/**
 * Functional Component
 * ====================
 * @param {object} props
 * @return {Element}
 */
const PromptPWA = (props) => {
    /**
     * @name handleClick
     * @param {object} e Event
     * @return {void}
     * @description Menyimpan nilai ke WebStorage | localStorage
     */
    const handleClick = e => {
        props.setPrompt(e.currentTarget.value)
        props.handleClick && props.handleClick()
        // reg.update 
        props.reload && props.reload()
    }

    return (
        <div 
          id="snackbar" 
          className={props.updated || props.visible ? 'show' : undefined}>
        <h3> 
        {props.updated 
            ? '[!] Halaman perlu diload ulang, Om 😋' 
            : 'Mau Nyobain PWA ngk 😃?  '
        }
            <button onClick={handleClick} value={true}>
            { props.updated 
                ? 'RELOAD'
                : 'IYA'
            }
            </button>
            {' '}
            <button onClick={handleClick} value={false}>
            Tidak
            </button>
        </h3>
        </div>
    )
}
(() => {
    pwaPrompt.hasPrompt() === 'true' && 
        serviceWorker.register({onUpdate: pwaPrompt.onUpdate})
    pwaPrompt.hasPrompt() === 'false' && 
        serviceWorker.unregister()
    const reactElement = document.createElement('div')
    render(
        <>
            <PromptPWA 
                updated={pwaPrompt.hasPrompt() === 'updated'}
                setPrompt={pwaPrompt.setPrompt}
                visible={!pwaPrompt.hasPrompt()}
                reload={pwaPrompt.pwaUpdate}/>    
            <App/>
        </>, 
        reactElement)
    document.body.appendChild(reactElement)
})()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
