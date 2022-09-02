export const generateBgColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
    // setUserInfo({ ...userInfo, avatarColor: `#${randomColor}` });
}