import axios from "axios";
import { showAlert } from "./alerts";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QHNzpArA5kbhfPaddjgXfjfOUlGJbiKnAIGsoaAZYS9kC0bcKZTvp3qHYsooTcnZAQSntOytKZ20dbdLqeurQbU004QpcQ5jS"
);

const stripe = await stripePromise;

export const bookTour = async (tourId) => {
  try {
    const token = localStorage.getItem("token");
    // 1) Get checkout session from API
    const session = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }api/v1/bookings/checkout-session/${tourId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
