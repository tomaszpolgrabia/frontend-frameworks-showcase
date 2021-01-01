import {useParams} from 'react-router-dom';
import {PeopleForm} from "./PeopleForm";

export default function PeopleEdit() {
    let {personId} = useParams();
    return (<div>
        <div className="container">
            <PeopleForm personId={personId}/>
        </div>
    </div>)
};
