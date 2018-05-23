import { withStyles } from 'material-ui/styles';
import React, { PureComponent } from 'react';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

const styles = {
    container: {
        padding: '20px',
        margin: '16px 15%'
    },
    big: {
        width: '500px'
    },
    medium: {
        width: '360px',
        marginRight: '30px'
    },
    small: {
        width: '100px'
    },
    center: {
        textAlign: 'center'
    },
    mr60: {
        marginRight: '60px'
    }
};

class Form extends PureComponent {
    render() {
        const { classes, children, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Paper className={classes.container}>
                    <div className={classes.center}>
                        <Field
                            className={classes.medium}
                            label="Название"
                            margin="normal"
                            component={TextField}
                            name="title"
                        />
                        <Field
                            className={classes.small}
                            label="Номер"
                            margin="normal"
                            name="orderNumber"
                            type="number"
                            component={TextField}
                        />
                    </div>

                    <div className={classes.center}>
                        <Field
                            className={classes.mr60}
                            label="Желаемая цена"
                            margin="normal"
                            name="myPrice"
                            type="number"
                            component={TextField}
                        />
                        <Field
                            label="Срочно покупать"
                            margin="normal"
                            name="myPriceHot"
                            type="number"
                            component={TextField}
                        />
                    </div>
                    <div className={classes.center}>
                        <Field
                            className={classes.big}
                            multiline
                            label="Список ссылок"
                            fullWidth
                            margin="normal"
                            name="urlList"
                            component={TextField}
                        />
                    </div>
                </Paper>
                {children}
            </form>
        );
    }
}

export default Form |> withStyles(styles) |> reduxForm({ form: 'entity' });
