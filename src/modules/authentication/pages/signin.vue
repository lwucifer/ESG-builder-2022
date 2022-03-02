<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Routes } from '@/router'

@Component
export default class TheLoginSignin extends Vue {
  //*===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎Data
  isLoading = false
  valid = true
  rules = {
    email: [
      (v: string) => !!v || 'This information is required',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    password: [
      (v: string) => !!v || 'This information is required',
      (v: string) =>
        (v && v.length >= 8) || 'Password may not be less than 8 characters'
    ]
  }
  form = {
    email: '',
    password: ''
  }
  //*===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏Computed

  get forgotRoute(): { name: string } {
    return { name: Routes.forgot.name }
  }

  //*===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊Methods

  async onLogin(): Promise<void> {
    this.isLoading = true
    await this.$store.dispatch('login', this.form).then(
      (res) => {
        if (res?.data) {
          this.$router.push({ name: Routes.publishFramework.name })
        }
      },
      (err) => {
        const message =
          err?.response?.data?.message ||
          'Username or password is incorrect. Please try again'
        this.$showSnack(message, true)
      }
    )
    this.isLoading = false
  }

  //*===🦌===🦌===🦌===🦌===🦌===🦌===🦌===🦌===🦌===🦌===🦌===🦌Hooks
}
</script>

<template>
  <div class="purple-theme fill-height">
    <v-container
      class="d-flex justify-center flex-column flex-nowrap"
      fill-height
      fluid
    >
      <v-card class="py-5" width="373">
        <div
          class="fw-700 font-gopher txt-purple-4 fs-28 text-center title-login"
        >
          Internal Login
        </div>
        <img alt="" class="my-6" src="@/assets/icons/rectangle.png" />
        <v-card-text class="px-6 py-0">
          <v-form ref="login" v-model="valid">
            <v-text-field
              v-model="form.email"
              :qa="`${$route.path}-textInput-Email`"
              :rules="rules.email"
              class="required"
              dense
              label="Email"
              maxlength="255"
              name="email"
              outlined
              required
            >
              <template v-slot:message="{ message }">
                <div class="d-flex flex-row justify-start align-center">
                  <v-icon class="mr-1" color="error" small>
                    mdi-information-outline
                  </v-icon>
                  {{ message }}
                </div>
              </template>
            </v-text-field>
            <v-text-field
              v-model="form.password"
              :qa="`${$route.path}-textInput-Password`"
              :rules="rules.password"
              class="required"
              dense
              label="Password"
              maxlength="255"
              name="password"
              outlined
              required
              type="password"
              @keypress.enter="onLogin"
            >
              <template v-slot:message="{ message }">
                <div class="d-flex flex-row justify-start align-center">
                  <v-icon class="mr-1" color="error" small>
                    mdi-information-outline
                  </v-icon>
                  {{ message }}
                </div>
              </template>
            </v-text-field>
            <div class="d-flex flex-column align-center">
              <router-link
                :qa="`${$route.path}-button-Having trouble logging in?`"
                :to="forgotRoute"
                class="txt-purple-4 fs-12 fw-500 mb-7 trouble-login"
              >
                Having trouble logging in?
              </router-link>
              <v-btn
                :disabled="!valid"
                :loading="isLoading"
                :qa="`${$route.path}-button-Login`"
                class="btn-purple-4"
                depressed
                height="40"
                width="100%"
                @click="onLogin"
              >
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  .v-alert__border--right {
    display: none;
  }

  .email-wrapper {
    color: red;
  }

  .v-alert__content {
    font-size: 13px;
  }

  .elevation-4 {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}

.title-login {
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  color: #150a84;
}

.trouble-login {
  text-decoration: none;
  color: #150a84;
  font-weight: 500;
}
</style>
