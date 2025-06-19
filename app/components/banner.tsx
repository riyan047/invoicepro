export const Banner = () => {
    return (
        <div className="py-3 text-center bg-[linear-gradient(to_right,#FEECFF,#FECAFF,#FEB5FF,#FFDBE7,#FFF4D6,#F3FCD7,#D2F5EE,#C3EFFF,#FBEFFF)] bg-200 animate-slide-bg max-w-none">
            <div className="container">
                <p className="font-medium">
                    <span className="hidden sm:inline">
                        Smarter invoicing starts here -
                    </span>
                    <a href="/login" className="underline underline-offset-4"> Experience the new InvoicePro!</a>
                </p>
            </div>
        </div>)
};