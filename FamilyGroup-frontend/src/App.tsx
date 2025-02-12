import  AuthProvider from "./provider/AuthProvider";
import  Routes  from "./routes/Routes";
import HeaderComponent from "./components/HeadersComponent";
import Footer from "./components/Footer";

function App() {
  
  return (
    <AuthProvider>  
      <HeaderComponent />
      <Routes/>
      <Footer />
    </AuthProvider>
  )     
}

export default App
