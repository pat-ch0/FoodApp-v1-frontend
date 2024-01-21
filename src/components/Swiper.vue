<template>
  <div class="swiper" 
       @touchstart="startSwipe" 
       @touchmove="moveSwipe" 
       @touchend="endSwipe" 
       @touchcancel="endSwipe">
    <div class="swipe-action swipe-left" :style="leftActionStyle">
      <slot name="left"></slot>
    </div>
    <div class="swiper-content" :style="contentStyle">
      <slot></slot>
    </div>
    <div class="desktop-actions">
      <slot name="desktop-actions"></slot>
    </div>
    <div class="swipe-action swipe-right" :style="rightActionStyle">
      <slot name="right"></slot>
    </div>
  </div>
</template>
    
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Swiper extends Vue {
  startX = 0;
  currentX = 0;
  swiping = false;
  threshold = 96;
  contentStyle = {};
  leftActionStyle = {};
  rightActionStyle = {};

  startSwipe(event: TouchEvent) {
    this.swiping = true;
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
  }

  moveSwipe(event: TouchEvent) {
    if (!this.swiping) return;
    this.currentX = event.touches[0].clientX;

    const xDiff = this.currentX - this.startX;
    const moveX = Math.max(-this.threshold, Math.min(this.threshold, xDiff));

    this.contentStyle = { transform: `translateX(${moveX}px)` };
    this.leftActionStyle = { 
      transform: `translateX(${xDiff > this.threshold ? 0 : -this.threshold}px)`,
      opacity: xDiff > this.threshold ? 1 : 0
    };
    this.rightActionStyle = { 
      transform: `translateX(${xDiff < -this.threshold ? 0 : this.threshold}px)`,
      opacity: xDiff < -this.threshold ? 1 : 0
    };
  }

  endSwipe() {
    this.swiping = false;
    const xDiff = this.currentX - this.startX;

    if (xDiff > this.threshold) {
      this.$emit('swipe-left');
    } else if (xDiff < -this.threshold) {
      this.$emit('swipe-right');
    }

    setTimeout(() => {
      this.resetSwiper();
    }, 5000);
  }

  resetSwiper() {
    this.contentStyle = {};
    this.leftActionStyle = {};
    this.rightActionStyle = {};
  }
}
</script>
  
<style scoped>
@import "../css//variables.css";

.swiper {
  display: flex;
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.swipe-action {
  position: absolute;
  top: 0;
  bottom: 0;
  width: var(--swiper-action-width);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--swiper-transition-duration) ease-out,
    opacity var(--swiper-transition-duration) ease-out;
  will-change: transform, opacity;
}

.swipe-left {
  left: 0;
  transform: translateX(calc(-1 * var(--swiper-action-width)));
  background-color: var(--color-background-left-swipe);
}

.swipe-right {
  right: 0;
  transform: translateX(var(--swiper-action-width));
  background-color: var(--color-background-right-swipe);
}

.swiper-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: var(--swiper-content-padding);
  transition: transform var(--swiper-transition-duration) ease-out;
  will-change: transform;
}

.swiper .desktop-actions {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
  
  