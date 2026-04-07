import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";

const DashboardLayout = ({ children, showFooter = false }) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <main
        className="min-h-screen px-4 pb-10 pt-28 md:px-6 lg:pl-[min(20rem,24vw)]"
        style={{
          marginLeft: 0,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-2 md:px-4 lg:px-6">
          {children}
        </div>
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default DashboardLayout;
