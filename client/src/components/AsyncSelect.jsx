import React from 'react'
import axios from 'axios'
import Select, { components } from 'react-select'


const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, child => {
        return child && child.type !== Placeholder ? child : null;
      })}
    </ValueContainer>
  );
};

let objectCompare = (query, prevQuery) => {
    for (let key in query) {
        if(query[key] !== prevQuery[key]){
            return true
        }
    }

    return false
}

class AsyncSelect extends React.Component {
    state = {
        disabled: true,
        options: [],
        value: null,
        isLoading: false,
    }

    componentDidMount() {
        if (this.props.query)
            this.getOptions()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (objectCompare(this.props.query, prevProps.query))
            this.getOptions()
    }

    handleChange = (obj) => {
        let name = this.props.id
        this.props.handleSelectChange(name, obj)
    }

    getOptions = async () => {
        let response

        this.setState(prevState => ({
            isLoading: true,
        }))

        try {
            response = await axios({
                method: 'get',
                url: this.props.endpoint,
                params: this.props.query
            })

            let options = [
                {label: "None", value:null}
            ]
            let responseOptions = response.data.result.map(row => ({
                label: row.name,
                value: row.row_id,
            }))

            options = [
                ...options,
                ...responseOptions
            ]

            if (response.data.status === 200) {
                this.setState(prevState => ({
                    options,
                    disabled: false,
                    isLoading: false,
                }))
            }
            else{
                this.setState(prevState => ({
                    isDisabled: true,
                    isLoading: false,
                }))
            }
        }
        catch (err) {
            this.setState(prevState => ({
                disabled: true,
                isLoading: false,
            }))
        }
    }

    render() {
        let { options, isLoading } = this.state
        let { isDisabled, name, value } = this.props
        console.log(name, value)
        return (
            <Select
                options={options}
                isDisabled={ isDisabled === false ? false : isDisabled === true? true : !isDisabled || isLoading }
                isLoading={isLoading}
                isClearable={false}
                value={value}
                onChange={this.handleChange}
                components={{
                    ValueContainer: CustomValueContainer
                }}
                placeholder={name}
                styles={{
                    container: (provided, state) => ({
                        ...provided,
                        marginTop: 15,
                    }),
                    valueContainer: (provided, state) => ({
                        ...provided,
                        overflow: "visible",
                    }),
                    placeholder: (provided, state) => ({
                        ...provided,
                        position: "absolute",
                        textTransform: 'capitalize',
                        top: state.hasValue || state.selectProps.inputValue ? -15 : "50%",
                        transition: "top 0.1s, font-size 0.1s",
                        fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
                    })
                }}
            />
        )
    }
}

export default AsyncSelect