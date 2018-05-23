import React from 'react';
import { withStyles } from 'material-ui/styles';
const format = require('date-format');
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Img from '../Items/Img.jsx';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default
        }
    }
});

class MainTable extends React.PureComponent {
    render() {
        const {
            classes,
            items,
            onChangePagination,
            pagination,
            onRowClick
        } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Изображение</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Низкие цены</TableCell>
                            <TableCell>Моя цена</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.data.map(x => (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={false}
                                tabIndex={-1}
                                selected={false}
                                key={x.id}
                                onClick={() => onRowClick(x.id)}
                            >
                                <TableCell scope="row">{x.title}</TableCell>
                                <TableCell>
                                    {x.img && <Img src={x.img} />}
                                </TableCell>
                                <TableCell>
                                    {x.priceList.map(p => (
                                        <div key={p.id}>
                                            {p.itemUrl.domain}: {p.price}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {x.minPrice.map(p => (
                                        <div key={p.id}>
                                            {p.itemUrl.domain} ({format.asString(
                                                'dd.MM.yyyy',
                                                new Date(p.date)
                                            )}): {p.price}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {x.myPrice}
                                    <br /> {x.myPriceHot}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={items.data.length}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    labelRowsPerPage="Товаров на странице"
                    onChangePage={(_, page) => onChangePagination('page', page)}
                    onChangeRowsPerPage={ev => {
                        onChangePagination('rowsPerPage', ev.target.value);
                    }}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(MainTable);
