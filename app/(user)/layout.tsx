import Header from "./components/header/Header";
import Footer from "./components/Footer/footer";
import { AuthProvider } from "../providers/authProvider";
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Header />
        {children}
        <Footer />
      </AuthProvider>
    </>
  );
}
