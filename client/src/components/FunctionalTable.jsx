import React, { Suspense, lazy } from "react";
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import DataTable from './DataTable'
import AddEditForm from './AddEditForm'
import ModalTrigger from './ModalTrigger'

import { alertActions } from "../actions";
import { flattenObject } from "../helpers/utils";

class SimpleTable extends React.Component {
    modalRef = React.createRef()
    state = {
        selected: 0,
        entity: {
            name: '',
            parent: null,
            organization: null,
            division: null,
        },
        fields: [],
        data: [],
        editMode: false,
        isFetching: false,
        success: null,
    }

    async componentDidMount(){
        this.getData()
        // this.getSelectData()
    }

    // getSelectData = () => {
    //     let indeterminates = []
    //     let others = []

    //     this.props.fields.forEach(row => {
    //         if(row.indeterminate)
    //             indeterminates.push(row)
    //         else
    //             others.push(row)
    //     })

    //     console.log(indeterminates)

    //     if(indeterminates.length > 0){
    //         console.log("true")
    //         let promises = indeterminates.map((row, index) => {
    //             console.log("PARAMS: ", row.requestParams.params)
    //             return axios({
    //                 method: 'get',
    //                 url: `${row.requestParams.endPoint}`,
    //                 params: row.requestParams.params || {},
    //             })
    //         })

    //         console.log(promises)

    //         Promise.all(promises)
    //         .then(result => {
    //             for(let i = 0; i < result.length; i++){
    //                 console.log("SSEL RES: ", result)
    //                 let selectMapping = indeterminates[i].requestParams.selectMapping
    //                 let mapping = result[i].data.result.map(row =>
    //                     ({
    //                         name: row[selectMapping[0]],
    //                         value: row[selectMapping[1]]
    //                     })
    //                 )
                    
    //                 console.log("MAPPING: ", mapping)
    //                 indeterminates[i].selectOptions = mapping
    //             }

    //             let fields = [
    //                 ...others,
    //                 ...indeterminates,
    //             ]

    //             this.setState(prevState => ({
    //                 fields,
    //             }), () => console.log('FIELDS: ', this.state.fields))

    //             console.log(indeterminates)
    //         })
    //         .catch(err => {
    //             this.setState(prevState => ({
    //                 fields: this.props.fields
    //             }))
    //         })
    //     }
    //     else{
    //         console.log("false")
    //         this.setState(prevState => ({
    //             fields: this.props.fields,
    //         }))
    //     }
    // }

    getData = async () => {
        let response

        try{
            response = await axios({
                method: 'get',
                url: `${this.props.endpoint}`,
                params: {
                    bu_id: this.props.organization && this.props.organization,
                    div_id: this.props.division && this.props.division
                },
            })

            this.handleGetResponse(response)
        }
        catch (err) {
            this.handleGetResponse(err.response)
        }
    }

    setEditMode = (record) => {
        this.setState(prevState => ({
          entity: {
            ...prevState.entity,
            ...record,
          },
          editMode: true,
        }), () => this.modalRef.handleModalOpen())
    }

    unsetEditMode = (event, reason) => {
        let formdata = {}
        this.props.headers.forEach(row => formdata[row.id] = '')

        this.setState(prevState => ({
            entity: formdata,
            editMode: false,
        }))
    }

    handleGetResponse = (res) => {
        let error = res.data.message;

        if (res.data.status >= 400) {
            this.setState(prevState => ({
                isFetching: false,
                success: false,
            }))
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            this.setState(prevState => ({
                data: res.data.result,
                isFetching: false,
                success: true,
            }))
        }
    }

    handleChange = (event) => {
        let target = event.target.id;
        let value = event.target.value;
        this.setState(prevState => ({
            entity: {
                ...prevState.entity,
                [target]: value,
            }
        }))
    }

    handleSubmit = async() => {
        this.setState({
            entity: {
                ...this.state.entity,
                bu_id: this.props.organization,
                div_id: this.props.division,
            }
        }, this.sendPostRequest)

    }

    sendPostRequest = async () => {
        let response;

        let data = flattenObject(this.state.entity)

        try{
            response = await axios({
                method: 'post',
                url: `${this.props.endpoint}`,
                data,
            })

            this.handlePostResponse(response)
            return
        }
        catch(err){
            this.handlePostResponse(err.response)
            return
        }
    }

    handlePostResponse = (res) => {
        if (res.data.status >= 400) {
            this.setState(prevState => ({
                
            }))

            this.props.error(`${this.props.title} Could Not Be Added`)
        }

        else if (res.data.status >= 200 && res.data.status < 300) {
            console.log("UPDATED: ", res.data.updated)
            if(res.data.updated && this.state.editMode){
                let index = this.state.data.findIndex(row => row.row_id === res.data.result.row_id)
                let newData = this.state.data

                newData[index] = res.data.result

                this.setState(prevState => ({
                    data: newData
                }))

                this.props.success(`${this.props.title} Successfully Updated`)
            }
            else if(res.data.updated && !this.state.editMode){
                this.props.warning(`${this.props.title} Already Exist`)
            }
            else{
                this.setState(prevState => ({
                    data: [
                        ...prevState.data,
                        res.data.result,
                    ]
                }))

                this.props.success(`${this.props.title} Successfully Added`)
            }
        }
        else{
            this.props.error(`${this.props.title} Could Not Be Added`)
        }
    }

    handleDelete = async (id) => {
        let response

        try{
            response = await axios({
                method: 'delete',
                url: this.props.endpoint,
                data: {
                    id,
                }
            })

            if(response.data.status === 200){
                this.props.success(`${this.props.title} Deleted Successfully`)
                let newData = this.state.data.filter(row => row.row_id !== id)

                this.setState(prevState => ({
                    data: newData
                }))
            }
            else{
                this.props.error({message: `${this.props.title} Could Not Be Deleted`})
            }
        }
        catch(err){
            this.props.error({message: `${this.props.title} Could Not Be Deleted`})
        }
    }

    isSelected = (id) => {
        return this.state.selected === id
    }

    selectEntity = (title, id, name) => {
        
        let data = this.state.data.filter(row => row.row_id == id)
        let label = data[0].name

        this.setState(prevState => ({
            selected: id
        }), () => {
            this.props.selectEntity(title, this.state.selected, label)
        })
    }

    // getParents = () => {
    //     let foundOrg = this.props.headers.find(ele => ele.value === 'organization')
    //     let foundDiv = this.props.headers.find(ele => ele.value === 'division')

    //     if(foundOrg){
    //         this.state.data.map(row => {
    //             row.organization = row.C_BU.name
    //         })
    //     }

    //     if(foundDiv){
    //         this.state.data.map(row => {
    //             row.division = row.C_DIV.name
    //         })
    //     }

    //     // this.state.data.map(row => {
    //     //     row.parent = row.parent ? row.parent.name : 0
    //     // })
    // }

    render(){
        let {classes, title, headers, schema, clearSelection, fields} = this.props
        let {entity, data, editMode} = this.state

        let addComponent = <ModalTrigger
                                IconButton={
                                    <Tooltip title="Add">
                                        <IconButton aria-label="Add">
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                innerRef={node => this.modalRef = node}
                                disabled={editMode}
                                onClose={this.unsetEditMode}
                            >
                                <AddEditForm
                                    headerTitle={title}
                                    object={entity}
                                    fields={fields}
                                    schema={schema}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    editMode={editMode}
                                />
                            </ModalTrigger>

        return (
            <DataTable
                headerTitle={title}
                rows={headers}
                data={data}
                isSelectable
                actions
                selectEntity={this.selectEntity}
                setEditMode={this.setEditMode}
                unsetEditMode={this.unsetEditMode}
                handleDelete={this.handleDelete}
                clearSelection={clearSelection}
                editMode={editMode}
                AddComponent={addComponent}
            />

            // <Paper className={classes.root}>
            //     <Table className={classes.table}>
            //         <TableHead>
            //             <TableRow>
            //                 {headers.map(header =>
            //                     <TableCell>{header.title}</TableCell>
            //                 )}
            //             </TableRow>
            //         </TableHead>
            //         <TableBody classes={{root: classes.tableBodyRoot}}>
            //             {data.map(row => {
            //                 const isSelected = this.isSelected(row.row_id);
            //                 // this.getParents()             
            //                 return (
            //                     <TableRow
            //                         tabIndex={-1}
            //                         aria-checked={isSelected}
            //                         selected={isSelected}
            //                         key={row.row_id}
            //                         hover
            //                         classes= {{
            //                             root: classes.tableRow,
            //                             selected: classes.selectedRow,
            //                         }}
            //                         onClick={event => this.selectEntity(event, row.row_id, row.name)}
            //                     >
            //                         {headers.map(header =>
            //                             <TableCell align="left">{header.value2 ? row[header.value] ? row[header.value][header.value2] : '' : row[header.value]}</TableCell>
            //                         )}
            //                     </TableRow>
            //             )})}
            //         </TableBody>
            //     </Table>
            //     <ExpansionPanel>
            //         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            //             <Typography className={classes.heading}>Add {title}</Typography>
            //         </ExpansionPanelSummary>
            //         <ExpansionPanelDetails className={classes.addOrgFormRoot}>
            //             <TextField
            //                 // error={errors.email}
            //                 // helperText={errors.email && <ul className={classes.errorList}> {errors.email.map((error)=>{ return <li className={classes.errorListItem}>{error}</li>})}</ul>}
            //                 id="name"
            //                 label="Name"
            //                 value={entity.name}
            //                 onChange={this.handleChange}
            //                 // onBlur={this.validate}
            //                 classes={{
            //                     root: classes.inputRoot,
            //                 }}
            //                 // className={classNames(classes.textField, classes.dense)}
            //                 margin="dense"
            //                 variant="filled"
            //                 InputProps={{
            //                     className: classes.input,
            //                 }}
            //                 InputLabelProps={{
            //                     className: classes.inputLabel,
            //                 }}
            //             />
            //             <TextField
            //                 id="parent"
            //                 select
            //                 label={`Parent ${title}`}
            //                 className={classNames(classes.textField, classes.dense)}
            //                 value={entity.parent}
            //                 onChange={this.handleChange}
            //                 SelectProps={{
            //                     native: true,
            //                     MenuProps: {
            //                         className: classes.menu,
            //                     },
            //                 }}
            //                 // helperText="Please select your currency"
            //                 margin="dense"
            //                 variant="filled"
            //                 classes={{
            //                     root: classes.inputRoot,
            //                 }}
            //                 InputProps={{
            //                     className: classes.input,
            //                 }}
            //                 InputLabelProps={{
            //                     className: classes.inputLabel,
            //                     shrink: true,
            //                 }}
            //             >
            //                 <option value={null}>
            //                     {''}
            //                 </option>
            //                 {data.map(option => (
            //                     <option key={option.row_id} value={option.row_id}>
            //                         {option.name}
            //                     </option>
            //                 ))}
            //             </TextField>
            //             <Button
            //                 variant="contained"
            //                 color="primary"
            //                 className={classNames(classes.button, classes.textField)}
            //                 onClick={this.handleSubmit}
            //             >
            //                 Add
            //             </Button>
            //         </ExpansionPanelDetails>
            //     </ExpansionPanel>
            // </Paper>
        )
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(()=>{}, {...alertActions})(SimpleTable);