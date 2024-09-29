import React from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';  // Make sure these are imported correctly

export const UserContext = React.createContext(null);  // Named export for UserContext

export function Card(props) {
  function classes() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: '18rem' }}>
      <div className="card-header card-header-center">{props.header}</div> 
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
