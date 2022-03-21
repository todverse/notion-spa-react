import React from 'react';
import ReactDOM from 'react-dom';
import ProfList from './assets/tsx/profList'
import Prof from './pages/profile'
import '/node_modules/font-awesome/css/font-awesome.min.css'
import './assets/scss/index.scss'


class App extends React.Component {
    dat!: Object
    public saveProfile = (dat:Object) => {
        this.dat = dat;
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }
    public componentDidMount() {
        document.getElementsByClassName('prof')[0]?.setAttribute('style', 'display:none')
    }
    public render() {
        return (
            <div className='app'>
                <ProfList saveProfile={this.saveProfile} data={[]} />
                <Prof dat={this.dat} />
            </div>
        )
    }
}




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

