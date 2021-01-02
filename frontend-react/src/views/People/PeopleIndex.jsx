import "bulma";
import {useContext, useEffect, useState} from "react";
import {FormattedMessage, useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';
import GlobalContext from "../../GlobalContext";

export default function PeopleIndex() {
    const {peopleService} = useContext(GlobalContext);
    const [people, setPeople] = useState([]);
    const history = useHistory();
    const {formatMessage} = useIntl();

    useEffect(() => {
        peopleService.getAllPeople()
            .then(people => {
                setPeople(people);
            });
    }, [peopleService]);

    function routeToPersonEdit(id) {
        history.push(`/people/edit/${id}`);
    }

    return (<div className="container">
        <table className="table is-striped is-fullwidth">
            <thead>
            <tr>
                <th><FormattedMessage id='people.index.table.id.header'/></th>
                <th><FormattedMessage id='people.index.table.firstName.header'/></th>
                <th><FormattedMessage id='people.index.table.lastName.header'/></th>
                <th><FormattedMessage id='people.index.table.email.header'/></th>
                <th><FormattedMessage id='people.index.table.status.header'/></th>
            </tr>
            </thead>
            <tbody>
            {people.map(it =>
                <tr onDoubleClick={() => routeToPersonEdit(it.id)} key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.firstName}</td>
                    <td>{it.lastName}</td>
                    <td>{it.email}</td>
                    <td>{it.status === 0
                        ? formatMessage({id: 'people.index.table.status.value.active'})
                        : formatMessage({id: 'people.index.table.status.value.inactive'})}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>)
}
