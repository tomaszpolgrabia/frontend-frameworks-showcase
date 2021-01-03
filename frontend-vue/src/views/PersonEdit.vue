<template>
  <PersonForm :id="personId"/>
</template>

<script>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import PersonForm from "../components/PersonForm";

export default {
  components: {PersonForm},
  setup() {
    const router = useRouter();
    const personId = computed(() => Number.parseInt(router.currentRoute.value.params.personId, 10));
    return {personId};
  }

}
</script>

<style scoped>

</style>
