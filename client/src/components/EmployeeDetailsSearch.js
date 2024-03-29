import React from 'react'
import axios from 'axios'
// import AutoComplete from './AutoComplete'
import AutoSuggest from './AutoSuggest';
import Container from './MainContainer';
import EmployeeBadge from './EmployeeBadge';
import EmployeeDetails from './EmployeeDetails';

class EmployeeDetailsSearch extends React.Component {
    state = {
        suggestions: [],
        value: "",
        selected: null,
        isFetching: false,
        success: null,
        filter: "name",
        query: "",
    }

    getEmployees = async () => {
        let response

        this.setState(prevState => ({
            isFetching: true,
        }))

        try {
            response = await axios({
                method: 'get',
                url: `/public/search/employee?${this.state.query}`,
            })
            
            console.log(response)
            this.handleResponse(response)
        }
        catch (err) {

        }
    }

    handleResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
            if (res.data.redirectURL)
                window.location.href = `${res.data.redirectURL}`;
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                suggestions: res.data.result,
                isFetching: false,
                success: true,
            }), ()=> console.log("STATE SUGGESTION: ", this.state))
        }
    }

    onChange = (event, { newValue }) => {
        console.log(this.state.filter)
        this.setState({
            value: newValue,
            query: `${this.state.filter}=${newValue}`
        });
    };

    clearSuggestions = () => {
        this.setState({
            suggestions: [],
        });
    }

    selectEmployee = (selected) => {
        console.log(selected)

        this.setState(prevState => ({
            selected,
        }))
    }

    changeSearchFilter = (filter) => {
        if(filter){
            this.setState(prevProps => ({
                filter,
                query: `${this.state.filter}=${prevProps.value}`
            }), () => console.log(this.state))
        }
    }

    render() {
        let { value, isFetching, suggestions, selected } = this.state

        return (
            <Container>
                <AutoSuggest
                    value={value}
                    apiCall={this.getEmployees}
                    onChange={this.onChange}
                    onClear={this.clearSuggestions}
                    onSelect={this.selectEmployee}
                    suggestions={suggestions}
                    isLoading={isFetching}
                    searchFilterProps={{
                        changeFilter: this.changeSearchFilter,
                        filters: [ 'id', 'name', 'location', 'position', 'division', 'responsibility' ],
                        filterMapping: {
                            id: 'emp_num',
                            name: 'name',
                            location: 'ATTRIB_01',
                            position: 'postn_held_id',
                            division: 'div_id',
                            responsibility: 'resp_id',
                        }
                    }}
                />
                <EmployeeBadge
                    data={selected}
                />
                <EmployeeDetails
                    object={selected}
                />
            </Container>
        )
    }
}

export default EmployeeDetailsSearch