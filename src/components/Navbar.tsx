 const Navbar = () => {
    return (
        <section className="flex justify-between px-4 py-4 border-b-2 mb-2">
            <div>
                <h1>Resumify</h1>
            </div>
            <div className="flex border w-[40%]">
                <ul className="flex justify-around border w-[100%]">
                    <li>About</li>
                    <li>Resume</li>
                    <li>{"User Name"}</li>
                </ul>
            </div>
        </section>
    )
}

export default Navbar;