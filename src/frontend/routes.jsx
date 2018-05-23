import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from 'containers/Layout.jsx';
import Books from 'containers/Books.jsx';
import Entity from 'containers/Entity.jsx';

export default () => (
    <Layout>
        <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/edit/:type/:id" component={Entity} />
        </Switch>
    </Layout>
);
