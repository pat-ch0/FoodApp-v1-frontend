<template>
  <div>
    <!-- Mobile Navbar -->
    <div class="mobile-navbar" v-if="showMobileNavbar && showNavbar">
      <!-- Icons for search, cart, and menu -->
      <router-link @click="closeMenu" to="/storage" class="icon">
        <img src="../assets/icons/cart.svg" alt="Cart Icon" />
      </router-link>
      <router-link @click="closeMenu" to="/search" class="icon">
        <img src="../assets/icons/search.svg" alt="Search Icon" />
      </router-link>
      <div @click="openMenu" class="icon">
        <img src="../assets/icons/menu.svg" alt="Menu Icon" />
      </div>

      <!-- Mobile toggle menu-->
      <div v-if="menuOpen" class="menu">
        <div @click="closeMenu" class="menu-item">
          <router-link to="/profile" class="menu-item-routerlink">
              <img src="../assets/icons/profile.svg" alt="Profile Icon" class="icon" />
               <span>Profile</span>
            </router-link>
          </div>
        <div @click="closeMenu" class="menu-item">
          <router-link to="/favorites" class="menu-item-routerlink">
            <img src="../assets/icons/heart.svg" alt="Favorites Icon" class="icon" />
            <span>Favorites</span>
          </router-link>
        </div>
      </div>
      </div>

      <!-- Desktop Navbar -->
      <div class="desktop-navbar" v-if="showDesktopNavbar && showNavbar">
        <!-- Horizontal menu items -->
        <router-link to="/">Home</router-link>
        <router-link to="/search">Search</router-link>
        <router-link to="/storage">Storage</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/favorites">Favorites</router-link>
      </div>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

@Options({ name: 'Navbar' })
export default class NavbarComponent extends Vue {
  // Variables to control visibility
  showMobileNavbar = true;
  showDesktopNavbar = false;
  showNavbar = true;
  menuOpen = false;

  // Methods to toggle visibility
  updateVisibility() {
    const screenWidth = window.innerWidth;
    const breakpointWidth = 600;
    this.showMobileNavbar = screenWidth <= breakpointWidth;
    this.showDesktopNavbar = screenWidth > breakpointWidth;
  }

  // Lifecycle hook to update visibility on component mount
  mounted() {
    this.updateVisibility();

    // Listen for window resize events to update visibility
    window.addEventListener('resize', this.updateVisibility);

    // Listen for route changes to decide whether to show the navbar
    this.$router.beforeEach(this.handleRouteChange);
  }

  // Cleanup on component destruction
  beforeDestroy() {
    // Remove the resize event listener to avoid memory leaks
    window.removeEventListener('resize', this.updateVisibility);

    // Remove the route change listener
    this.$router.beforeEach((to, from, next) => next());
  }

  // Handle route changes
  handleRouteChange(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showNavbar = !to.meta.hideNavbar;
    this.closeMenu();
    next();
  }

  // Open the menu
  openMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // Close the menu
  closeMenu() {
    this.menuOpen = false;
  }
}
</script>
  
<style scoped>
/* TODO: Add variables css and import variales.css */
.mobile-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  scale: 1.3;
}

/*desktop navbar */
.desktop-navbar {
  display: none;

}

.menu {
  position: absolute;
  width: 175px;
  height: 228px;
  flex-shrink: 0;
  bottom: 72px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 16px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.menu-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
}

.menu-item-routerlink {
  text-decoration: none;
}
.menu-item img {
  margin-right: 1em;
  margin-bottom: -4px;
}

/* Media query for desktop screens */
@media (min-width: 600px) {
  .desktop-navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .menu {
    display: none;
  }
}
</style>
  