<template>
  <div class="grey darken-1 empty-layout">
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >поле email не должно быть пустым</small
          >

          <small
            v-else-if="$v.email.$dirty && !$v.email.email"
            class="helper-text invalid"
            >поле должно содержать email</small
          >
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <label for="password">Пароль</label>
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="helper-text invalid"
            >Введите пароль</small
          >
          <small
            v-else-if="$v.password.$dirty && !$v.password.minLength"
            class="helper-text invalid"
            >Длина пароля должна быть не менее
            {{ $v.password.$params.minLength.min }} символов</small
          >
        </div>
        <div class="input-field">
          <input id="name" type="text" v-model.trim="name" />
          <label for="name">Имя</label>
          <small
            v-if="$v.name.$dirty && !$v.name.required"
            class="helper-text invalid"
            >Введите имя</small
          >
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (
        this.$v.password.$invalid ||
        this.$v.name.$invalid ||
        this.$v.email.$invalid ||
        this.$v.agree.$invalid
      ) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        console.log(formData);
        await this.$store.dispatch("register", formData);
        this.router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
