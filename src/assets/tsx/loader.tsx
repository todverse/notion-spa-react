import React from 'react'
import './../scss/loader.scss'



class Loader extends React.Component {
    public render() {
        return(
            <div className='loader'>
                <p>Получение данных с сервера, пожалуйста подождите!</p>
                <i className='fa fa-spin fa-5x fa-spinner'></i>
            </div>
        )
    }
}


export default Loader 