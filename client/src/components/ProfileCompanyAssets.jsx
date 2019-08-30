import React, { Component, lazy, Suspense } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Container from './MainContainer'
import { getUser } from '../reducers/authReducer';

import LoadingSpinner from './LoadingSpinner';

const EmployeeDetailSection = lazy(() => import('./EmployeeDetailSection'))

class ProfileCompanyAssets extends Component {
    state = {
        data: [],
    }

    async componentDidMount(prevProps, prevState){
        this.getEmployeeDetails()
    }

    getEmployeeDetails = async () => {
        let response
        let emp_id = this.props.userID

        try{
            response = await axios({
                method: 'get',
                url: '/admin/employee/details',
                params: {
                    employee: emp_id,
                },
            })
            console.log(response)
            this.setState(prevState => ({
                data: response.data.result,
            }))
        }
        catch(err){
            this.props.error(err)
        }
    }
    render() {
        let { userID } = this.props
        const { data } = this.state

        return (
            <Container>
                <Suspense fallback={<LoadingSpinner/>}>
                    <EmployeeDetailSection
                        headerTitle="Assets Details"
                        detailType='assets_details'
                        indeterminate={true}
                        employee={userID}
                        endpoint={`/admin/employee/attachedAssets?emp_id=${userID}`}
                        schema={{}}                    
                        data={data.filter(row => row.type === 'assets_details').map(ele => ({ ...ele, name: ele.function && ele.function.val}))}
                        handleSubmit={this.handleSubmit}
                        expanded
                        defaultExpanded
                    />
                </Suspense>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userID: getUser(state)
})

export default connect(mapStateToProps, {})(ProfileCompanyAssets)