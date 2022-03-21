import React from 'react'
import './../scss/menuSort.scss'


interface IProps {
    type: string,
    sortC : React.MouseEventHandler<HTMLButtonElement>,
}

interface Props {
    sortCity : React.MouseEventHandler<HTMLButtonElement>,
    sortCompany : React.MouseEventHandler<HTMLButtonElement>,
}

class ButtonSortBy extends React.Component<IProps> {
    public render() {
        return(
            <button onClick={this.props.sortC} className='btn_sort'>по {this.props.type}</button>
        )
    }
}


class MenuSort extends React.Component<Props> {
    public render() {
        return(
            <div className='menuSort'>
                <h3 className='menuSort_mainText'>Сортировка</h3>
                <ButtonSortBy sortC={this.props.sortCity} type='городу' />
                <ButtonSortBy  sortC={this.props.sortCompany}  type='компании' />
            </div>
        )
    }
}


export default MenuSort