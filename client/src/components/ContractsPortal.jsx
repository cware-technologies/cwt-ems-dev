import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'

import Container from './MainContainer'
import { alertActions } from '../actions';
import { getUser } from '../reducers/authReducer';
import EmployeeBadge from './EmployeeBadge';

export class ContractsPortal extends Component {
    state = {
        data: {}
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: '/private/employee',
                params: {
                    employee: this.props.userId,
                }
            })

            if(response.data.status === 200){
                this.setState(prevState => ({
                    data: response.data.result,
                }))
            }
            else{
                this.props.error({ message: "Couldn't fetch the employee record." })
            }
        }
        catch(err){
            this.props.error({ message: "Couldn't fetch the employee record." })
        }
    }

    render() {
        let { data } = this.state

        return (
            <Container>
                <EmployeeBadge
                    data={data}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: getUser(state),
})

const mapDispatchToProps = {
    ...alertActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractsPortal)
