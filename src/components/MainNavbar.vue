<template>
  <nav>
    <div class="link-container">
      <RouterLink class="link" to="/">Profiles</RouterLink>
      <RouterLink class="link" to="/create-profile">Create profile</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  max-width: 1280px;
  width: 100%;
}

.link-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.link {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-family: 'Roboto Mono', monospace;
}

.link:hover {
  color: #39e58c;
}
</style>
