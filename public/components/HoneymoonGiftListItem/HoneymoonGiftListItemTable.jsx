import React from 'react';
import { Table } from 'react-bootstrap';
import HoneymoonGiftListItemRow from './HoneymoonGiftListItemRow';

function HoneymoonGiftListItemTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Requested</th>
                    <th>Remaining</th>
                    <th>Price (£)</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
            {
                props
                    .items
                    .map(item => (
                        <HoneymoonGiftListItemRow
                            key={item._id}
                            item={item}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                        />
                    ))
            }
            </tbody>
        </Table>
    );
}

HoneymoonGiftListItemTable.propTypes = {
    items: React.PropTypes.array.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

export default HoneymoonGiftListItemTable;
