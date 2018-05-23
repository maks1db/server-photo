import { withStyles } from 'material-ui/styles';
import React, { PureComponent } from 'react';
import Button from 'material-ui/Button';
import SaveIcon from '@material-ui/icons/Save';

const style = {
    btn: {
        position: 'fixed',
        bottom: '30px',
        right: '30px'
    }
};

class NewItem extends PureComponent {
    constructor() {
        super();
        this.state = {
            disabled: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ disabled: false });
        }, 1000);
    }
    handleClick = () => {
        alert('dgsdg');
    };

    render() {
        const { classes } = this.props;
        const { disabled } = this.state;
        return (
            <div className={classes.btn}>
                <Button
                    variant="fab"
                    color="secondary"
                    disabled={disabled}
                    type="submit"
                >
                    <SaveIcon />
                </Button>
            </div>
        );
    }
}

export default withStyles(style)(NewItem);
