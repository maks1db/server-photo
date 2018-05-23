import React, { PureComponent } from 'react';
import MenuItem from './Items/MenuItem.jsx';

export default class LeftPanel extends PureComponent {
    render() {
        return (
            <aside id="left-panel" className="left-panel">
                <nav className="navbar navbar-expand-sm navbar-default">
                    <div
                        id="main-menu"
                        className="main-menu collapse navbar-collapse"
                    >
                        <ul className="nav navbar-nav">
                            <h3 className="menu-title">Книги</h3>
                            <ul>
                                <MenuItem active={false} href="#" ico="table">
                                    Список книг
                                </MenuItem>
                                <MenuItem
                                    active={false}
                                    href="#"
                                    ico="bar-chart"
                                >
                                    Графики
                                </MenuItem>
                            </ul>
                            <h3 className="menu-title">Прочая продукция</h3>

                            <ul>
                                <MenuItem active={false} href="#" ico="table">
                                    Список товаров
                                </MenuItem>
                                <MenuItem
                                    active={false}
                                    href="#"
                                    ico="bar-chart"
                                >
                                    Графики
                                </MenuItem>
                            </ul>
                            <h3 className="menu-title">Дополнительно</h3>
                            <ul>
                                <MenuItem active={false} href="#" ico="glass">
                                    Настройки
                                </MenuItem>
                            </ul>
                        </ul>
                    </div>
                </nav>
            </aside>
        );
    }
}
