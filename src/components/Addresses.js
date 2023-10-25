import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { randomHashArray } from "./constants";
import {Link} from 'react-router-dom'
const Addresses = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
    <h3 className="my-3">Click any below Address to transfer eth</h3>
    <ListGroup>
        {randomHashArray?.map(item=>(
            <ListGroupItem className="p-3">
                <Link to={`/addresses/${item}`} className="addressItem">{item}</Link>
            </ListGroupItem>
        ))}

    </ListGroup>
    </div>
  );
};

export default Addresses;
