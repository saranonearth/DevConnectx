import React, { Fragment } from 'react';
import Spinner from '../../img/spinner.gif';

const Spiner = () => {
  return (
    <Fragment>
      <img
        src={Spinner}
        alt='loading'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};

export default Spiner;
