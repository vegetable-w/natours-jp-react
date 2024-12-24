import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./AppLayout";
import "./style.css";
import Overview from "./pages/Overview";
import Tour from "./pages/Tour";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Error from "./pages/Error";
import MyTours from "./pages/MyTours";
import MyReviews from "./pages/MyReviews";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/tour/:tourId" element={<Tour />} />
            <Route path="/me" element={<Account />} />
            <Route path="/my-tours" element={<MyTours />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
