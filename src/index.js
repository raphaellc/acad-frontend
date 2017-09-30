import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Home from './componentes/Home';
import CadastroBox from './componentes/Cadastro';
import Logout from './componentes/Logout';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {matchPattern} from 'react-router/lib/PatternUtils';

function verificaAutenticacao(nextState, replace) {
    const resultado = matchPattern('/academia', nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

    if (enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
        replace("/");
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/academia" component={App} onEnter={verificaAutenticacao}>
            <IndexRoute component={Home}/>
            <Route path="cadastro" component={CadastroBox}/>
            <Route path="logout" component={Logout}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
