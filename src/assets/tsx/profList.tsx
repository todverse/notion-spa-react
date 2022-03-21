import React, { Component } from 'react'
import MenuSort from './menuSort'
import './../scss/profList.scss'
import Loader from './loader'



interface Props {
    data: Array<Data>,
    saveProfile: Function,
}                    
interface IState {
    data: Array<Data>,
    saveProfile:Function,
}
interface Address {
    city : string
}
interface Company {
    name : string
}
interface Data {
    id : number,
    name : string,
    address : Address,
    company : Company,
}
            


class Profile extends React.Component<Props> {
    public saveProfile = (event: { target: any }) => {
        let arr = Array.from(document.getElementsByClassName('btn_page'))
        this.props.saveProfile(this.props.data[arr.indexOf(event.target)])
        document.getElementsByClassName('prof')[0]?.setAttribute('style', 'display:flex')
        document.getElementsByClassName('menuProf')[0]?.setAttribute('style', 'display:none')
    }
    public render() {
        let profiles = [];
        for(let i = 0; i < this.props.data.length; i++) profiles.push(
            <div className="profile">
                <p className='FIO'>
                    <span className='profile_placeholder'>ФИО:</span> {this.props.data[i].name}
                </p>
                <p className='FIO'>
                    <span className='profile_placeholder'>город:</span> {this.props.data[i].address.city}
                </p>
                <p className='FIO'>
                    <span className='profile_placeholder'>компания:</span> {this.props.data[i].company.name}
                </p>
                <a onClick={this.saveProfile}  className='btn_page'>Подробнее</a>
            </div>
        )
        return(
            profiles
        )
    }
}


class ProfList extends React.Component<IState> {
    public state:IState = {
        data: [],
        saveProfile: () => {},
    }
    public componentDidMount() {
        let users = fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((res) => {
        this.setState({data: res})
        document.getElementsByClassName('loader')[0].setAttribute('style', 'display:none')
        })
    }
    public sortByCity = () => {
        let arr = this.state.data;
        arr.sort((a, b) => {
            if(a.address.city < b.address.city) {
                return -1
            }else if(a.address.city > b.address.city) {
                return 1
            }
            return 1
        })
        this.setState({
            data: arr,
        })
    }
    public sortByCompany = () => {
        let arr = this.state.data;
        arr.sort((a, b) => {
            if(a.company.name < b.company.name) {
                return -1
            }else if(a.company.name > b.company.name) {
                return 1
            }
            return 1
        })
        this.setState({
            data: arr,
        })
    }
    dat!: {}
    public saveProfile = (dat: Object) => {
        this.dat = dat
        this.props.saveProfile(this.dat)
    }
    public render() { 
        return( 
            <div className='menuProf'>
                <Loader /> 
                <MenuSort sortCity={this.sortByCity} sortCompany={this.sortByCompany} />
            <div className='profList'>
                <h3 className='profList_mainText'>Список пользователей</h3>
                <Profile saveProfile={this.saveProfile} data={this.state.data} />
                <p className='count_profiles'>Найдено {this.state.data.length} пользователей</p>
            </div>
            </div>
        )
    }
}


export default ProfList