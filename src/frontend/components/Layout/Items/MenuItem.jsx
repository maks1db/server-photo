import React from 'react';
import classname from 'helpers/components/classname';

export default ({ active, href, ico, children }) => (
    <li {...classname({ active: active })}>
        <a href={href}>
            <i className={`menu-icon fa fa-${ico}`} />
            {children}
        </a>
    </li>
);
