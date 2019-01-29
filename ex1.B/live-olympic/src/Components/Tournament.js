import React, { Component } from 'react'

import { MdDelete } from 'react-icons/md'
import { MdSave } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'


class Tournament extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
        this.edit       = this.edit.bind(this)
        this.delete     = this.delete.bind(this)
        this.save       = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderUI   = this.renderUI.bind(this)
    }
    edit() {
        this.setState({
            editing: true
        })
    }
    delete() {
        this.props.onDelete(this.props.index)
    }
    save(e) {
        e.preventDefault()
        this.props.onChange(this._newTournament.value, this.props.index)
        console.log(this._newTournament.value)
        this.setState({
            editing: false
        })
    }
    renderForm(props){
        return (
            <div>
                <form onSubmit={this.save}>
                    <textarea ref={(input) => this._newTournament = input} cols="30" rows="10"/>
                    <span>
                    <button onClick={this.save}><MdSave/></button>
                    </span>
                </form>
            </div>
        )
    }
    renderUI(props) {
        return (
            <div className='tournament'>
                <div>{this.props.children}</div>
                {/* <span>
                    <button onClick={this.edit} className="btn btn-primary" style={{marginRight: 7+'px'}}><MdEdit></MdEdit></button>
                    <button onClick={this.delete} className="btn btn-primary"><MdDelete></MdDelete></button>
                </span> */}
            </div>
        )
    }
    render() {
        return this.state.editing ? this.renderForm() : this.renderUI()
    }
}

export default Tournament