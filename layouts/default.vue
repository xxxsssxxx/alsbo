<template>
  <v-app dark>
    <v-navigation-drawer class="secondary" mini-variant expand-on-hover permanent app>
      <v-list>
        <v-list-item two-line class="px-2">
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
      <v-switch v-model="theme" color="indigo darken-3" inset hide-details>
        <template v-slot:label>
          <span class="text--text">Dark</span>
        </template>
      </v-switch>
      <v-btn @click.stop="rightDrawer = !rightDrawer" icon class="text--text">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
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
export default {
  name: "Default",
  data() {
    return {
      miniVariant: false,
      rightDrawer: false
    };
  },
  computed: {
    theme: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
      }
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    tabs() {
      return [
        {
          icon: "mdi-apps",
          title: this.$t("navigation.link_home"),
          to: "/"
        },
        {
          icon: "mdi-currency-usd",
          title: this.$t("navigation.link_pricing"),
          to: "/pricing"
        },
        {
          icon: "mdi-file-table-box",
          title: this.$t("navigation.link_items"),
          to: "/items"
        }
      ];
    },
    rightMenuButtons() {
      return [
        {
          icon: "mdi-account-key",
          title: this.$t("navigation.link_administration"),
          to: "/administration"
        },
        {
          icon: "mdi-clipboard-account",
          title: this.$t("detail.user"),
          to: "/user"
        },
        {
          icon: "mdi-account-star",
          title: this.$t("registration.title"),
          to: "/registration"
        },
        {
          icon: "mdi-door-open",
          title: this.$t("navigation.link_logout"),
          to: "/login"
        }
      ];
    }
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
