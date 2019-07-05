import { store } from './reduxStore'
import { alertActions } from '../actions'

export const errorHandler = (that, res, state) => {
    if(res.data.status === 200){
        that.setState( prevState => state )
        store.dispatch(alertActions.success("Action Succesfull"))
    }

    else if(res.data.status >= 400){
        that.setState( prevState => state )
        store.dispatch(alertActions.error({ message: "Action Failed" }))
    }
}