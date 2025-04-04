<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"; // Import Axios

// Store payment methods and loading states
const paymentMethods = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch payment methods using Axios
const fetchPaymentMethods = async () => {
  try {
    const response = await axios.get('https://order.vouchstar.shop/api/v1/payment/methods/', {
      headers: {
        'X-Vouchstar-Token': 'WcGiAnhnEGUQrCFA4KmCFpaIfIWNBIy0Qw8blirmTo2ETO3OZqghwlM6XU8dvOe7'
      }
    });

    paymentMethods.value = response.data.payment_methods; // Store the payment methods in the state
  } catch (err) {
    error.value = err.message; // Handle error
  } finally {
    loading.value = false; // Stop loading
  }
};

// Fetch payment methods when component mounts
onMounted(fetchPaymentMethods);
</script>

<template>
  <div class="payment-container">
    <h2>Choose a Payment Method</h2>
    
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-else class="payment-grid">
      <div v-for="method in paymentMethods" :key="method.id" class="payment-card">
        <h3>{{ method.name }}</h3>
        <VouchstarBtn
          :config="{
            price: 20.0,
            payment: {
              currency: method.currencies[0], // Use the first currency for each method
              paymentMethod: method.type
            }
          }"
          theme="light"
          type="row"
          size="lg"
        />
      </div>
    </div>
  </div>

  <VouchstarModal />
</template>

<style scoped>
/* Styling */
.payment-container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  font-size: 1.8rem;
  color: #444;
  margin-bottom: 1rem;
}

.loading, .error {
  font-size: 1.2rem;
  color: red;
  margin: 20px;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
}

.payment-card {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.payment-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.15);
}
</style>


<!-- const config = ref({
  price: 20.0,
  payment: {
    currency: "USD",
    paymentMethod: "PCL_BLIK_REDIRECT",
  },
  user: {
    email: "test@email.com",
    phonePrefix: "+48",
    phoneNumber: 123123123,
  },
});
</script> -->