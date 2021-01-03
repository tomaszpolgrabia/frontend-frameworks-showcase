<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h2 id="logo" class="is-uppercase bold">
          {{ $t('app.navbar.banner') }}
        </h2>
      </a>

      <a href="#logo" role="button" class="navbar-burger" aria-label="menu"
         aria-expanded="false"
         data-target="mainNavbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="mainNavbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">
          {{ $t('app.navbar.home.label') }}
        </router-link>

        <router-link class="navbar-item" to="/people/add">
          {{ $t('app.navbar.addPerson.label') }}
        </router-link>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href="#logo" class="button is-primary">
              <strong>
                {{ $t('app.navbar.signup') }}
              </strong>
            </a>
            <a href="#logo" class="button is-light">
              <strong>
                {{ $t('app.navbar.login') }}
              </strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
@import "~bulma";
</style>
<script>
import {provide} from 'vue';
import {PeopleServiceDIKey} from "./utils/constants";
import RestPeopleService from "./services/RestPeopleService";

export default {
  setup() {
    provide(PeopleServiceDIKey, new RestPeopleService());
    return {};
  }
};
</script>
