export const ImagePreview = ({ image, name }) => {
    return (
        <div className="w-28 mt-2 h-28 p-2 bg-main border border-border rounded">
            <img
                src={image ? image : "https://res.cloudinary.com/dwfmpiozq/image/upload/v1730028243/png-clipart-user-computer-icons-avatar-miscellaneous-heroes_re29tb.png"}
                alt={name}
                className="w-full h-full object-cover rounded"
            />
        </div>
    );
};
