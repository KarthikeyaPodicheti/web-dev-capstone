export function routeFromHash() {
  const route = window.location.hash.replace("#", "") || "/";
  return ["/", "/shop", "/cart"].includes(route) ? route : "/";
}

export function navigate(route) {
  window.location.hash = route;
}
