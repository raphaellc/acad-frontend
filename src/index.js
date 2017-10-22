import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Home from './componentes/Home';
import CadastroBox from './componentes/Cadastro';
import RestricoesBox from './componentes/Restricoes';
import MatriculaBox from './componentes/Matricula';
import Logout from './componentes/Logout';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {matchPattern} from 'react-router/lib/PatternUtils';

function verificaAutenticacao(nextState, replace) {
    const resultado = matchPattern('/academia', nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

    if (enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
        replace("?msg=Você precisa estar logado para acessar o endereço");
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}></Route>
        <Route path="/academia" component={App} onEnter={verificaAutenticacao}>
            <IndexRoute component={Home}/>
            <Route path="cadastro" component={CadastroBox}/>
            <Route path="restricoes" component={RestricoesBox}/>
            <Route path="matricula" component={MatriculaBox}/>
            <Route path="logout" component={Logout}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
