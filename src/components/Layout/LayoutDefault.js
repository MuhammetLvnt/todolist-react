import Header from "./Header";
import Footer from "./Footer";


function LayoutDefault({children}) {
    return (
        <>
        <Header/>
        {children}
        {/* <Footer/> */}
        </>
    )
}

export default LayoutDefault
