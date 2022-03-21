import React from 'react'
import MenuSort from '../assets/tsx/menuSort'
import './profile.scss'

interface Dat {
    name?: string,
    username?: string,
    email?: string,
    address?: Address,
    phone?:number,
    website?:string,
}

interface Address {
    city?:string,
    street?:string,
    zipcode?:number,
}

interface Props {
    dat? : Dat,
}


class Page extends React.Component<Props> {
    public change =()=> {
        let inputs = document.getElementsByTagName('input');
        let textarea = document.getElementsByTagName('textarea')[0];
        let submit = document.getElementsByClassName('submit')[0];

        submit.removeAttribute('disabled')
        textarea.removeAttribute('readonly')

        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].hasAttribute('readonly')) {
                inputs[i].removeAttribute('readonly')
                inputs[i].setAttribute('style', 'color: black;')
            }
        }
    }

    public componentDidMount() {
        let inputs = document.getElementsByTagName('input');
        let textarea = document.getElementsByTagName('textarea')[0];
        let submit = document.getElementsByClassName('submit')[0];

        submit.setAttribute('disabled', 'true')
        textarea.setAttribute('readonly', 'true')

        for(let i = 0; i < inputs.length; i++) {
            if(!inputs[i].hasAttribute('readonly')) {
                inputs[i].setAttribute('readonly', 'true')
            }
        }
    }

    public sendData =()=> {
        let inputs = document.getElementsByTagName('input');
        let obj = {
            name: inputs[0].value,
            username: inputs[1].value,
            email: inputs[2].value,
            address: {
                street: inputs[3].value,
                city: inputs[4].value,
                zipcode:inputs[5].value
            },
            phone:inputs[6].value,
            website:inputs[7].value,
        }

        let json = JSON.stringify(obj);
        console.log(json);


        document.getElementsByClassName('prof')[0]?.setAttribute('style', 'display:none')
        document.getElementsByClassName('menuProf')[0]?.setAttribute('style', 'display:flex')
    }

    public validateInputs = () => {
        let inputs = document.getElementsByTagName('input');
        let submit = document.getElementsByClassName('submit')[0];
        let count = 0;


        for(let i =0; i < inputs.length; i++) {
            if(inputs[i].type === 'email' && !inputs[i].value.includes('@') || inputs[i].type === 'email' && inputs[i].value === '') {
                inputs[i].setAttribute('style', 'border: 1px solid red; color: black;')
                submit.setAttribute('disabled', 'true');
                inputs[i].removeAttribute('readonly')
            } else if(inputs[i].type === 'email') {
                inputs[i].setAttribute('style', 'border: 1px solid rgb(216,216,216); color: black;')
            } 


            if(inputs[i].type === 'url' && !inputs[i].value.includes('.') || inputs[i].type === 'url' && inputs[i].value === '') {
                inputs[i].setAttribute('style', 'border: 1px solid red; color: black;')
                submit.setAttribute('disabled', 'true');
                inputs[i].removeAttribute('readonly')
            } else if(inputs[i].type === 'url') {
                inputs[i].setAttribute('style', 'border: 1px solid rgb(216,216,216); color: black;')
            }


            let tel;

            if(inputs[i].type === 'tel') {
                tel = inputs[i].value.split(' ');
                tel = tel.join('');
                tel = tel.split('-');
                tel = tel.join('');
                tel = tel.split('x');
                tel = tel.join('');
                tel = tel.split('(');
                tel = tel.join('');
                tel = tel.split(')');
                tel = tel.join('');
                tel = tel.split('+');
                tel = tel.join('');
                tel = tel.split('.');
                tel = tel.join('');
            }


            if(inputs[i].type === 'tel' && isNaN(Number(tel))  || inputs[i].type === 'tel' && inputs[i].value === '') {
                inputs[i].setAttribute('style', 'border: 1px solid red; color: black;')
                submit.setAttribute('disabled', 'true');
                inputs[i].removeAttribute('readonly')
            } else if(inputs[i].type === 'tel') {
                inputs[i].setAttribute('style', 'border: 1px solid rgb(216,216,216); color: black;')
            }


            if(inputs[i].type === 'text' && inputs[i].value === '') {
                inputs[i].setAttribute('style', 'border: 1px solid red; color: black;')
                submit.setAttribute('disabled', 'true');
                inputs[i].removeAttribute('readonly')
            } else if(inputs[i].type === 'text') {
                inputs[i].setAttribute('style', 'border: 1px solid rgb(216,216,216); color: black;')
            }


            if(inputs[i].getAttribute('style') === 'border: 1px solid rgb(216,216,216); color: black;'){
                count++;
            }

            if(count === 8) {
                submit.removeAttribute('disabled');
            }
        }
    }
    
    public render() {
        return(
            <div className='page'>
                <h3>Профиль пользователя</h3>
                <button onClick={this.change} className='change'>Редактировать</button>
                <form>
                    <p>Name</p>
                    <input type='text' required defaultValue={this.props.dat?.name} onChange={this.validateInputs}></input><br />
                    <p>Userame</p>
                    <input type='text' required defaultValue={this.props.dat?.username} onChange={this.validateInputs}></input><br />
                    <p>E-mail</p>
                    <input type='email' required defaultValue={this.props.dat?.email} onChange={this.validateInputs}></input><br />
                    <p>Street</p>
                    <input type='text' required defaultValue={this.props.dat?.address?.street} onChange={this.validateInputs}></input><br />
                    <p>City</p>
                    <input type='text' required defaultValue={this.props.dat?.address?.city} onChange={this.validateInputs}></input><br />
                    <p>Zipcode</p>
                    <input type='text' required defaultValue={this.props.dat?.address?.zipcode} onChange={this.validateInputs}></input><br />
                    <p>Phone</p>
                    <input type='tel' required defaultValue={this.props.dat?.phone} onChange={this.validateInputs}></input><br />
                    <p>Website</p>
                    <input type='url' required defaultValue={this.props.dat?.website} onChange={this.validateInputs}></input><br />
                    <p>Comment</p>
                    <textarea></textarea><br />
                    <input className='submit' type='button' onClick={this.sendData} value='Отправить'></input>
                </form>
            </div>
        )
    }
}

class Prof extends React.Component<Props> {
    public state:Props = {
        dat: {},
    }
    public render() {
        return(
            <div className='prof'>
                <MenuSort sortCity={()=>{}} sortCompany={()=>{}}/>
                <Page dat={this.props.dat} />
            </div>
        )
    }
}


export default Prof