import React from "react";
import { Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import ProtectedRoute from "./components/protectedRoute";

export default function App() {


  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Chat />
           </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/setAvatar"
        element={
          <ProtectedRoute>
            <SetAvatar />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
