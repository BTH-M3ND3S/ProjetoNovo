import { StatusBar } from "expo-status-bar";
import AuthProvider from "./src/Context/AuthContext";
import Rotas from "./src/Routes/Rotas";


export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Rotas/>
    </AuthProvider>
  );
}
