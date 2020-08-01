<template>
  <v-app dark>
    <v-navigation-drawer class="secondary" mini-variant expand-on-hover permanent app>
      <v-list>
        <v-list-item two-line class="px-2" to="/user">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ currentUser.firstname }}</v-list-item-title>
            <v-list-item-subtitle>{{ currentUser.lastname }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-for="(tab, i) in tabs" :key="i" :to="tab.to" router exact>
          <v-list-item-action>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="tab.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="primary text--text" app>
      <v-img src="/Brand.svg" contain max-height="50" max-width="100">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-spacer />
      <v-switch v-model="theme" color="secondary" inset hide-details append-icon="mdi-brightness-4"> </v-switch>
      <v-btn @click.stop="rightDrawer = !rightDrawer" icon class="text--text">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-alert
          :value="notification"
          :color="notification.type"
          :icon="notification.icon"
          transition="scale-transition"
          dark
          prominent
          dismissible
          width="360"
        >
          <p v-if="notification.title" class="title">{{ notification.title }}</p>
          <p v-if="notification.text">{{ notification.text }}</p>
        </v-alert>
        <Loading :loading="$store.state.loading" />
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" class="secondary" right temporary fixed>
      <v-list>
        <v-list-item v-for="(button, i) in rightMenuButtons" :key="i" :to="button.to" router exact>
          <v-list-item-action>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="button.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Loading from "@/components/Loading";
import { mapGetters } from "vuex";
export default {
  name: "Default",
  components: {
    Loading
  },
  data() {
    return {
      miniVariant: false,
      rightDrawer: false
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      notification: "notification"
    }),
    theme: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
      }
    },
    tabs() {
      return [
        {
          icon: "mdi-apps",
          title: this.$t("main.navigation.link_home"),
          to: "/"
        },
        {
          icon: "mdi-currency-usd",
          title: this.$t("main.navigation.link_pricing"),
          to: "/pricing"
        },
        {
          icon: "mdi-file-table-box",
          title: this.$t("main.navigation.link_items"),
          to: "/items"
        }
      ];
    },
    rightMenuButtons() {
      return [
        {
          icon: "mdi-account-key",
          title: this.$t("main.navigation.link_administration"),
          to: "/administration"
        },
        {
          icon: "mdi-clipboard-account",
          title: this.$t("main.detail.user"),
          to: "/user"
        },
        {
          icon: "mdi-account-star",
          title: this.$t("main.fields.title"),
          to: "/registration"
        },
        {
          icon: "mdi-door-open",
          title: this.$t("main.navigation.link_logout"),
          to: "/login"
        }
      ];
    }
  },
  watch: {
    $route() {
      this.notification && this.$store.commit("notify", false);
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
<style lang="scss" scoped>
.v-alert {
  position: absolute;
  z-index: 7;
  right: 0;
}
</style>
