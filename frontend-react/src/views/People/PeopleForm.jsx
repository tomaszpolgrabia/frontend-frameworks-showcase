import {useContext, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom';
import {isValidEmail, validateForm} from "../../utils/validators";
import GlobalContext from "../../GlobalContext";
import classNames from 'classnames';

const personValidators = {
    email: [isValidEmail]
};

export function PeopleForm(params) {
    const {personId} = params;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        status: 0
    });

    const history = useHistory();
    const {peopleService} = useContext(GlobalContext);
    let [errors, setErrors] = useState(validateForm(personValidators, formData));
    let [personNotAvailable, setPersonNotAvailable] = useState(true);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetching person data
        peopleService.getPersonById(personId)
            .then(person => {
                if (person) {
                    setFormData(person);
                    setErrors(validateForm(personValidators, person));
                    setPersonNotAvailable(false);
                    setLoading(false);
                } else {
                    console.log(`No person with id: ${personId}`);
                    setLoading(false);
                    setPersonNotAvailable(true);
                }
            })
            .catch(error => {
                console.log('Got error', error);
                setPersonNotAvailable(true);
                setLoading(false);
            });

    }, [personId, peopleService]);

    function submitPerson() {
        if (errors && Object.keys(errors).length > 0) {
            console.log('Errors in form, quiting...');
            return;
        }

        console.log('Submitting data', formData);

        if (!personId) {
            peopleService.createPerson(formData)
                .then(person => {
                    console.log(`Created person with id ${person.id}`, person);
                    history.push('/people');
                }).catch(error => {
                console.log('Person creation failed with error', error);
            });
        } else {
            peopleService.updatePerson(personId, formData)
                .then(person => {
                    console.log(`Updated person with id ${person.id}`, person);
                    history.push('/people');
                }).catch(error => {
                console.log('Person update failed with error', error);
            });
        }
    }

    function onInputChange(e) {
        const fieldName = e.target.name;
        formData[fieldName] = e.target.value;
        setFormData(formData);
        setErrors(validateForm(personValidators, formData));
    }

    return (loading
        ? <div className="loader"/>
        : (personNotAvailable && personId)
            ? <div>Sorry, the person with id {personId} is not available</div>
            : <form>
                <div className="field is-horizontal">
                    <div className="field-label is-medium">
                        <label htmlFor="firstName" className="label">First name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className={classNames("input", {'is-danger': errors.firstName})}
                                    placeholder="First name"
                                    value={formData?.firstName}
                                    onInput={onInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-medium">
                        <label htmlFor="lastName" className="label">Last name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className={classNames("input", {'is-danger': errors.lastName})}
                                    placeholder="Last name"
                                    value={formData?.lastName}
                                    onInput={onInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-medium">
                        <label htmlFor="email" className="label">E-mail</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className={classNames("input", {'is-danger': errors.email})}
                                    placeholder="E-mail"
                                    value={formData?.email}
                                    onInput={onInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-medium">
                        <label htmlFor="status" className="label">Status</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        id="status"
                                        name="status"
                                        className={classNames("input", {'is-danger': errors.status})}
                                        value={formData?.status}
                                        onInput={onInputChange}>
                                        <option value="0">Active</option>
                                        <option value="1">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button type="button" className="button is-primary" onClick={() => submitPerson()}>Submit
                        </button>
                    </div>
                </div>
            </form>)
};
