import { mount } from "@vue/test-utils";
import NavbarComponent from "@/components/Navbar.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import WelcomeView from "@/views/WelcomeView.vue";

// Mock components for paths that don't have corresponding components
const StubComponent = { template: "<div></div>" };

// Define routes, using actual components for defined paths and mock for others
const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/product",
    name: "product",
    component: ProductDetailView,
    props: true,
  },
  { path: "/welcome", name: "welcome", component: WelcomeView },
  { path: "/storage", component: StubComponent },
  { path: "/search", component: StubComponent },
  { path: "/profile", component: StubComponent },
  { path: "/favorites", component: StubComponent },
  { path: "/hidden", component: StubComponent, meta: { hideNavbar: true } },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

describe("NavbarComponent", () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, "addEventListener");
    removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    // Set the innerWidth to a value that corresponds to mobile or desktop
    global.innerWidth = 500; // Mobile width for initial state
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("mounts and renders", async () => {
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();

    // Check the initial state based on the mocked window width
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".mobile-navbar").exists()).toBe(true);
    expect(wrapper.find(".desktop-navbar").exists()).toBe(false);

    // Simulate a window resize to desktop width
    global.innerWidth = 800;
    window.dispatchEvent(new Event("resize"));
    await wrapper.vm.$nextTick(); // Wait for the next DOM update cycle

    // Check if the navbar updated after the window resize
    expect(wrapper.find(".mobile-navbar").exists()).toBe(false);
    expect(wrapper.find(".desktop-navbar").exists()).toBe(true);
  });

  it("toggles between mobile and desktop navbar based on screen width", async () => {
    // Mock `innerWidth`
    global.innerWidth = 500; // Mobile width
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    expect(wrapper.vm.showMobileNavbar).toBe(true);
    expect(wrapper.vm.showDesktopNavbar).toBe(false);

    // Change to desktop width and trigger resize
    global.innerWidth = 800;
    window.dispatchEvent(new Event("resize"));

    expect(wrapper.vm.showMobileNavbar).toBe(false);
    expect(wrapper.vm.showDesktopNavbar).toBe(true);
  });

  it("toggles the menu open and close", async () => {
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    // Initially, the menu should be closed
    expect(wrapper.vm.menuOpen).toBe(false);

    // Simulate opening the menu
    await wrapper.vm.openMenu();
    expect(wrapper.vm.menuOpen).toBe(true);

    // Simulate closing the menu
    await wrapper.vm.closeMenu();
    expect(wrapper.vm.menuOpen).toBe(false);
  });

  it("removes event listeners on destruction", async () => {
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();

    wrapper.unmount();
    // Check if `removeEventListener` was called for 'resize'
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
  });

  it("calls openMenu when the menu icon is clicked", async () => {
    const wrapper = mount(NavbarComponent, {
      global: { plugins: [router] },
    });
    await router.isReady();
  
    // Spy on the `openMenu` method
    const openMenuSpy = jest.spyOn(wrapper.vm, 'openMenu');
  
    // Trigger a click on the menu icon
    await wrapper.find('.icon.menu-button').trigger('click');
  
    // Assert that `openMenu` was called
    expect(openMenuSpy).toHaveBeenCalledTimes(1);
  
    // Clean up the spy
    openMenuSpy.mockRestore();
  });

  it("opens the menu on menu icon click and closes it on menu item click", async () => {
    const wrapper = mount(NavbarComponent, {
      global: { plugins: [router] },
    });
    await router.isReady();
  
    // Open the menu by clicking the menu icon
    await wrapper.find('.icon.menu-button').trigger('click');
    expect(wrapper.vm.menuOpen).toBe(true);
  
    // Close the menu by clicking a menu item
    await wrapper.find('.menu-item').trigger('click');
    expect(wrapper.vm.menuOpen).toBe(false);
  });

  it('hides the navbar when navigating to a route with hideNavbar meta', async () => {
    const wrapper = mount(NavbarComponent, {
      global: { plugins: [router] },
    });
    await router.isReady();

    await router.push('/hidden');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showNavbar).toBe(false);
  });

  it('shows the navbar when navigating away from a route with hideNavbar meta', async () => {
    router.push('/hidden'); // First, go to a route that hides the navbar
    await router.isReady();

    const wrapper = mount(NavbarComponent, {
      global: { plugins: [router] },
    });

    await router.push('/'); // Then, navigate to home
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showNavbar).toBe(true);
  });
});

// Reset mocks and spies
afterAll(() => {
  jest.restoreAllMocks();
});
