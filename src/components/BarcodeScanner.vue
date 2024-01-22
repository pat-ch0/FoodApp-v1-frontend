<template>
  <div class="scanner-overlay" @click.self="closeScanner">
    <div class="scanner-container">
      <stream-barcode-reader @decode="onDecode" @loaded="onLoaded"></stream-barcode-reader>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { StreamBarcodeReader } from 'vue-barcode-reader';

@Options({
  components: {
    StreamBarcodeReader
  }
})
export default class BarcodeScanner extends Vue {
  // Method triggered when barcode is successfully decoded
  onDecode(text: string) {
    console.log(`Decode text from QR code is ${text}`);

    // Verify if the barcode is valid (consists only of numbers)
    if (this.isValidBarcode(text)) {
      this.$emit('onBarcodeScanned', text);
    } else {
      console.error('Invalid barcode scanned:', text);
    }
  }

  // Method triggered when scanner is ready and operational
  onLoaded() {
    console.log(`Ready to start scanning barcodes`);
  }

  // Utility method to validate the scanned barcode text
  isValidBarcode(text: string): boolean {
    // Check if the text consists only of numbers
    return /^\d+$/.test(text);
  }

    // Close scanner when clicking outside the scanner container
    closeScanner() {
    this.$emit('closeScanner');
  }
}
</script>

<style scoped>
.scanner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  backdrop-filter: blur(5px); /* Blurry effect */
  display: flex;
  justify-content: center;
  align-items: center;
}

.scanner-container {
  max-width: 412px;
  position: relative;
  /* Additional styling as needed */
}
</style>
