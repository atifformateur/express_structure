const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SALT_ROUNDS = 10;

// s'enregistrer
async function register({email, password}){
    //utilise bcrypt pour hasher le mdp
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    //créer l'utilisateur ! stocker le mdp hash (pas le mdp normal !!!!)
    return User.create({email, password_hash: hash});
}

// validation des données de connexion (credential)
async function validateCredentials(email, password) {
    //verifier en bdd le user
    const user = await User.findOne({ where: {email}});
    //si aps de compte je stop l'execution de la funciton
    if (!user) return null;
    //comparer les mdp
    const isValid = await bcrypt.compare(password, user.password_hash);
    // si comparaison ok renvoi isvalid sinon renvoi null ! 
    return isValid ? user : null;
}

// generer le token
function generateToken(user) {
    jwt.sign(
        //les info minimal a envoyer au client => payload
        {sub: user.id, role: user.role},
        process.env.JWT_TOKEN, // la clé secrete pour "signer" le token
        { expiresIn: '3h'}
    )
}

module.exports = {generateToken, register, validateCredentials};