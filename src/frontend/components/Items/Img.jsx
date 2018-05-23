import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = {
    img: {
        width: '100px',
        height: '150px',
        backgroundSize: 'cover'
    }
};

function Img({ classes, src }) {
    return (
        <div
            className={classes.img}
            style={{ backgroundImage: `url(${src})` }}
        />
    );
}

export default withStyles(styles)(Img);
