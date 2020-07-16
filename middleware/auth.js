export default function({ store, redirect }) {
  debugger;
  if (!store.getters.hasToken) {
    redirect("/login");
  }
}
