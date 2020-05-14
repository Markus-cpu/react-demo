import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Content from './components/Content/Content';
import Dialogs from './components/Dialogs/Dialogs';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Email from './components/Email/Email';
import {BrowserRouter, Route} from 'react-router-dom';

const  App =(props)=> {
  return (
    <BrowserRouter>
      <div className="App">
    
        <Header/>
        <Sidebar/>
        <div className="App-wrapper-content">
          <Route exact path="/Dialogs" render={ () => <Dialogs />} />
          <Route exact path="/Content" component={Content}/>
          <Route exact path="/Home" component={Home}/>
          <Route exact path="/Contact" component={Contact}/>
          <Route exact path="/Email" component={Email}/>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
