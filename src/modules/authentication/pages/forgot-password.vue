<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Routes } from '@/router'
import { VTextField } from 'vuetify/lib'

//*===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶Secondary

type AuthError = {
  code: string
  message: string
}

enum AuthErrors {
  NoUser = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password'
}

//*===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷Primary

@Component({ components: { VTextField } })
export default class TheLoginForgot extends Vue {
  //*===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎Data

  isLoading = false
  error: null | AuthError = null

  //*===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏Computed

  get signinRoute(): { name: string } {
    return { name: Routes.login.name }
  }

  //*===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊Methods

  submitForm(): void {
    console.log('submitting form -> :')
  }

  onSubmit(): void {
    const name = Routes.login.name
    this.$router.push({ name })
  }

  handleError(err: { code: string; message: string }): void {
    console.log('Signup, onSubmit -> err:', err)
    this.error = {
      code: err.code,
      message: err.message
    }

    //* Override errors with custom messages
    const code = err.code
    if (code === AuthErrors.NoUser) {
      this.error.message = 'User with given credentials does not exist'
    } else if (code === AuthErrors.WrongPassword) {
      this.error.message = 'Wrong password, please try again'
    }
  }
}
</script>

<template>
  <div class="purple-theme fill-height">
    <v-container fluid fill-height class="d-flex justify-center purple-theme">
      <v-card width="373" class="dgx-card py-9 py-5">
        <div class="d-flex align-center justify-center dgx-title mb-7">
          <img class="mr-3" src="@/assets/icons/key.png" alt="" />
          Password Recovery
        </div>
        <img class="mb-7" src="@/assets/icons/curve.png" />
        <v-card-text class="px-6 py-0">
          <v-form>
            <v-text-field
              :class="{ required: true }"
              maxlength="255"
              :title="'Email'"
              :label="'Email'"
              :placeholder="'Email'"
              :outlined="true"
              :dense="false"
            >
              <template v-slot:message="{ message }">
                <div class="d-flex flex-row justify-start align-center">
                  <v-icon small class="mr-1" color="error">
                    mdi-information-outline
                  </v-icon>
                  {{ message }}
                </div>
              </template>
            </v-text-field>
            <v-btn
              class="btn mb-7"
              :loading="isLoading"
              height="40"
              width="100%"
              color="primary"
              @click="submitForm"
            >
              Reset Password
            </v-btn>
            <div class="d-flex justify-center">
              <router-link :to="signinRoute" class="dgx-link">
                Already have login and password? Login here
              </router-link>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
.dgx-link {
  font-family: 'MuktaBold';
  text-decoration: unset;
  color: #226fea;
  font-weight: bold;
  font-size: 12px;
}
.dgx-card {
  width: 373px !important;
  width: 26%;
}
.dgx-title {
  font-size: 20px;
  text-align: center;
  color: #2c2c2e;
}
.btn {
  font-family: 'MuktaBold';
  text-transform: capitalize !important;
  font-size: 14px;
  font-weight: 500;
}
.arrow-down {
  width: 100%;
  position: relative;
  background-color: #e2e2e2;
  height: 1px !important;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -15px;
    width: 0;
    height: 0;
    border-top: solid 15px #fff;
    border-left: solid 15px transparent;
    border-right: solid 15px transparent;
  }
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -16px;
    width: 0;
    height: 0;
    border-top: solid 16px #e2e2e2;
    border-left: solid 16px transparent;
    border-right: solid 16px transparent;
  }
}
</style>
