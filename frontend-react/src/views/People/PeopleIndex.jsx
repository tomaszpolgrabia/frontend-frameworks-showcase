import "bulma";
import {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import GlobalContext from "../../GlobalContext";

export default function PeopleIndex() {
    const {peopleService} = useContext(GlobalContext);
    const [people, setPeople] = useState([]);
    const history = useHistory();
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
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>E-mail</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {people.map(it =>
                <tr onDoubleClick={() => routeToPersonEdit(it.id)} key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.firstName}</td>
                    <td>{it.lastName}</td>
                    <td>{it.email}</td>
                    <td>{it.status === 0 ? 'Active' : 'Inactive'}</td>
                </tr>
            )}
            </tbody>
        </table>
    </div>)
}
