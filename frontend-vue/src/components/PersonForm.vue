<template>
  <div class="field is-horizontal">
    <div class="field-label is-medium">
      <label for="firstName"
             class="label">{{ $t('app.people.form.firstName.label') }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input
              id="firstName"
              name="firstName"
              type="text"
              :class="{'input': true, 'is-danger': errors.firstName}"
              v-model="formData.firstName"
              :placeholder="$t('app.people.form.firstName.label')"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-medium">
      <label for="lastName"
             class="label">{{ $t('app.people.form.lastName.label') }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input
              id="lastName"
              name="lastName"
              type="text"
              :class="{'input': true, 'is-danger': errors.lastName}"
              v-model="formData.lastName"
              :placeholder="$t('app.people.form.lastName.label')"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-medium">
      <label for="email"
             class="label">{{ $t('app.people.form.email.label') }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input
              id="email"
              name="email"
              type="text"
              :class="{'input': true, 'is-danger': errors.email}"
              v-model="formData.email"
              :placeholder="$t('app.people.form.email.label')"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-medium">
      <label for="status"
             class="label">{{ $t('app.people.form.status.label') }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <div class="select is-fullwidth">
            <select
                id="status"
                name="status"
                :class="{'input': true, 'is-danger': errors.status}"
                v-model="formData.status">
              <option
                  value="0">{{ $t('app.people.form.status.value.active') }}
              </option>
              <option
                  value="1">{{ $t('app.people.form.status.value.inactive') }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button type="button" class="button is-primary" @click="submitPerson()">
        {{ $t('app.people.form.submit.label') }}
      </button>
    </div>
  </div>
</template>

<script>
import {computed, reactive, toRefs, watch, watchEffect, inject, toRaw} from 'vue';
import {useRouter} from 'vue-router';
import {isValidEmail} from "../utils/validators";
import {PeopleServiceDIKey} from "../utils/constants";

export default {
  props: {
    id: Number
  },
  setup: function (props) {
    const {id} = toRefs(props);
    const peopleService = inject(PeopleServiceDIKey);
    const router = useRouter();

    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      status: 0
    });

    const errors = reactive({
      firstName: null,
      lastName: null,
      email: isValidEmail(formData.email),
      status: null
    });

    const formHasSomeErrors = computed(() => {
      return errors.firstName
          || errors.lastName
          || errors.email
          || errors.status;
    });

    const submitPerson = () => {
      if (formHasSomeErrors.value) {
        console.log('Form has some errors', errors)
        return;
      }

      const person = toRaw(formData);

      console.log('Submitting person', toRaw(formData));
      if (id?.value) {
        // updating person
        peopleService.updatePerson(id.value, person)
            .then(updated => {
              console.log(`Successfully updated person ${id.value}. New data: `, updated);
              router.push('/');
            });
      } else {
        // creating person
        peopleService.createPerson(person)
            .then(created => {
              console.log('Successfully create person with data: ', created);
              router.push('/');
            });
      }
    };

    const updatePersonStateWithData = person => {
      formData.firstName = person.firstName;
      formData.lastName = person.lastName;
      formData.email = person.email;
      formData.status = person.status;
    };

    watch(
        () => formData.email,
        (curr) => {
          errors.email = isValidEmail(curr);
        }
    )

    if (id?.value) {
      watchEffect(() => {
        peopleService.getPersonById(id.value)
            .then(person => {
              updatePersonStateWithData(person);
            });
      });
    }

    return {formData, personId: id, errors, submitPerson, formHasSomeErrors};
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma";
</style>
