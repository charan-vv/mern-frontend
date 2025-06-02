

const Loader = ({ isFullPage = true }) => {
    return (
        <div
            className={`${isFullPage
                ? "fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/80 to-black/80 flex justify-center items-center z-50"
                : "flex justify-center items-center"
                }`}
        >
            <div className="w-12 h-12 border-4 border-[#b8ff67]/30 border-t-[#b8ff67] rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;