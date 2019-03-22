import React from 'react';

class LeaveManager extends React.Component {
    
}

<TextField
    id="outlined-select-currency-native"
    select
    label="Native select"
    className={classes.textField}
    value={this.state.currency}
    onChange={this.handleChange('currency')}
    SelectProps={{
    native: true,
    MenuProps: {
        className: classes.menu,
    },
    }}
    helperText="Please select your currency"
    margin="normal"
    variant="outlined"
>
    {currencies.map(option => (
    <option key={option.value} value={option.value}>
        {option.label}
    </option>
    ))}
</TextField>