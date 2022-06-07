const getUserAuth = async (request, response) => {
    const user = request.user;
    if(!user) response.status(404).json({error: "User not found (idk how u get here)"})
    else response.status(200).json(user)
}


module.exports = {
    getUserAuth,
}