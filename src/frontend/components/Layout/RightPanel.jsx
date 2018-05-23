import React, { PureComponent } from 'react';

export default class RightPanel extends PureComponent {
    render() {
        return (
            <div id="right-panel" className="right-panel">
                <header id="header" className="header">
                    <div className="header-menu">
                        <div className="col-sm-7">
                            <div className="header-left">
                                <button className="search-trigger">
                                    <i className="fa fa-search" />
                                </button>
                                <div className="form-inline">
                                    <form className="search-form">
                                        <input
                                            className="form-control mr-sm-2"
                                            type="text"
                                            placeholder="Search ..."
                                            aria-label="Search"
                                        />
                                        <button
                                            className="search-close"
                                            type="submit"
                                        >
                                            <i className="fa fa-close" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="breadcrumbs">
                    <div className="col-sm-4">
                        <div className="page-header float-left">
                            <div className="page-title">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="page-header float-right">
                            <div className="page-title">
                                <ol className="breadcrumb text-right">
                                    <li>
                                        <a href="#">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#">UI Elements</a>
                                    </li>
                                    <li className="active">Buttons</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
