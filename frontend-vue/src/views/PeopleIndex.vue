<template>
  <div class="container">
    <table class="table is-striped is-fullwidth">
      <thead>
      <tr>
        <th>{{ $t('app.people.index.table.id.header') }}</th>
        <th>{{ $t('app.people.index.table.firstName.header') }}</th>
        <th>{{ $t('app.people.index.table.lastName.header') }}</th>
        <th>{{ $t('app.people.index.table.email.header') }}</th>
        <th>{{ $t('app.people.index.table.status.header') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr @dblclick="routeToPersonEdit(person.id)" v-for="person of people" :key="person.id">
        <td>{{ person.id }}</td>
        <td>{{ person.firstName }}</td>
        <td>{{ person.lastName }}</td>
        <td>{{ person.email }}</td>
        <td>{{
            person.status === 0
                ? $t('app.people.index.table.status.value.active')
                : $t('app.people.index.table.status.value.inactive')
          }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@import "~bulma";
</style>

<script>
import {inject, watchEffect, ref} from 'vue';
import {useRouter} from 'vue-router';
import {PeopleServiceDIKey} from '../utils/constants';

export default {
  setup() {
    const peopleService = inject(PeopleServiceDIKey);
    const people = ref([]);
    const router = useRouter();
    const routeToPersonEdit = (personId) => {
      router.push(`/people/edit/${personId}`);
    };

    watchEffect(() => {
      peopleService.getAllPeople()
          .then(peopleData => {
            people.value = peopleData;
          });
    });
    return {people, routeToPersonEdit};
  }
}
</script>
