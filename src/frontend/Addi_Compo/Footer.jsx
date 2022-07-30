const Footer=()=>{
    var year=new Date().getFullYear();
    return(
        <div className="footer">
            <footer>Copyright @ {year} | www.KryptoCart.com</footer>
        </div>
    )
}

export default Footer;