const User = require('../model/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../error')

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new BadRequestError("Please provide name, email, and password");
        }
        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new BadRequestError("Please provide a valid email address");
        }
        // Password strength validation
        const passwordRegex =
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$$/;

        if (!passwordRegex.test(password)) {
            throw new BadRequestError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            );
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError("Email already registered");
        }
        const user = await User.create({ name, email, password });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new BadRequestError("Please Provide Email and Password")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials of Gmail')
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid  Credentials of password')
        }
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    signup,
    login,
}